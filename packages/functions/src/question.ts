import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const PK = event.pathParameters?.questionType;
  const possibleQuestionTypes = [
    'WritingP1',
    'WritingP2',
    'ReadingP1',
    'ReadingP2',
    'ReadingP3',
    'ListeningP1',
    'ListeningP2',
    'ListeningP3',
    'ListeningP4',
    'SpeakingP1',
    'SpeakingP2P3',
    'vocabA1',
    'vocabA2',
    'vocabB1',
    'vocabB2',
    'vocabC1',
    'vocabC2',
  ];

  //validate the question type
  if (!PK || !possibleQuestionTypes.includes(PK)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid question type',
      }),
    };
  }

  const getIndexCommand = new GetCommand({
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the item which stores the sort keys of the available questions
    Key: {
      PK: PK,
      SK: 'index',
    },
  });

  try {
    // Retrieve the index item which contains the list of the sort keys of the available questions from the table
    const results = (await dynamoDb.send(getIndexCommand))!;
    const index = results.Item?.index
      ? results.Item?.index
      : (() => {
          throw new Error('Index not found');
        })();

    if (index.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'No questions found',
        }),
      };
    }

    // Select a random sort key from the index list
    let randomItemSortKey = index[Math.floor(Math.random() * index.length)];

    // Get the question with the selected sort key
    const getQuestionCommand = new GetCommand({
      // Get the table name from the environment variable
      TableName: Table.Records.tableName,
      // Get the question with the selected sort key
      Key: {
        PK: PK,
        SK: randomItemSortKey,
      },
    });
    const response = await dynamoDb.send(getQuestionCommand);

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
