import { DynamoDB } from 'aws-sdk';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const PK = event.pathParameters?.questionType;
  const possibleQuestionTypes = ["WritingP1", "WritingP2", "Reading", "Listening", "SpeakingP1", "SpeakingP2", "SpeakingP3"];

  //validate the question type
    if (!PK || !possibleQuestionTypes.includes(PK)) {
        return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Invalid question type',
        }),
        };
    }

  const getIndexParams = {
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the row where the counter is called "clicks"
    Key: {
      PK: PK,
      SK: 'index',
    },
  };

  const getParams = {
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the row where the counter is called "clicks"
    Key: {
      PK: PK,
      SK: '',
    },
  };
  try {
    // Retrieve the index item which contains the list of the sort keys of the available questions from the table
    const results = (await dynamoDb.get(getIndexParams).promise())!;
    const index = results.Item?.index ? results.Item?.index : (() => { throw new Error('Index not found'); })();

    // Select a random sort key from the index list
    let randomItemSortKey = index[(Math.floor(Math.random() * index.length))]

    // Get the question with the selected sort key
    getParams.Key.SK = randomItemSortKey;
    const response = await dynamoDb.get(getParams).promise();

    // Get only the "Question" column from the subquestions attribute if it exists
    const SubQuestions = response.Item?.SubQuestions ? JSON.parse(response.Item?.SubQuestions).SubQuestions.map((obj: any) => ({Q: obj["Q"]})) : '';

    return {
      statusCode: 200,
      body: JSON.stringify({
        Question: await response.Item?.Question,
        SubQuestions: await SubQuestions,
      }),
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
