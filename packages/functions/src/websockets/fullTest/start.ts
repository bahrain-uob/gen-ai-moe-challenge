import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { Table } from 'sst/node/table';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { wsError } from '../../utilities';
import {
  ListeningSection,
  questions,
  ReadingSection,
  SpeakingSection,
  startFullTestResponse,
  WritingSection,
} from 'src/utilities/fullTestUtilities';
import { filterQuestion } from 'src/utilities/fullTestFunctions';

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);
/*
 * This function is called when the user starts a test.
 * It retrieves a random question from the database based on the test type.
 * Then it stores the question in the database in the user's record.
 * The input should be as follows:
 * {
 *  action:'fullTestStart',
 * }
 *
 * It will return the following:
 * {
 *  testID: 'testID',
 *  type: 'listening',
 *  data: {
 *    question: 'question', // this will be based on the section question schema
 *                          // the same as the item in DB
 * }
 */
export const main: APIGatewayProxyHandler = async event => {
  // Get client info
  const { stage, domainName, authorizer } = event.requestContext;
  const endpoint = `https://${domainName}/${stage}`;
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: endpoint,
  });
  const connectionId = event.requestContext.connectionId!;

  const userId = authorizer!.userId;
  if (!userId) {
    return wsError(apiClient, connectionId, 400, 'No user specified');
  }

  // Test sections
  const testSections = ['writing', 'reading', 'listening', 'speaking'];

  try {
    // Get the index of the questions
    let questions: questions;
    const _Questions = testSections.map(async (PK: string) => getQuestion(PK));
    const QuestionsArray = await Promise.all(_Questions);
    questions = {
      writing: QuestionsArray[0] as WritingSection,
      reading: QuestionsArray[1] as ReadingSection,
      listening: QuestionsArray[2] as ListeningSection,
      speaking: QuestionsArray[3] as SpeakingSection,
    };
    const getUserTests = new GetCommand({
      TableName: Table.Records.tableName,
      Key: {
        PK: userId,
        SK: 'fullTests',
      },
    });

    const userTests = await dynamoDb.send(getUserTests);
    if (userTests.Item?.inProgress) {
      return wsError(
        apiClient,
        connectionId,
        400,
        'You already have a test in progress',
      );
    }

    const start_time = Date.now();
    const testID = `${start_time.toString()}-${uuidv4()}`;

    // Store the question in the user's record
    const putCommand = new PutCommand({
      TableName: Table.Records.tableName,
      Item: {
        PK: userId,
        SK: testID,
        questions,
        listeningAnswer: {
          start_time: start_time,
          status: 'In progress',
        },
      },
    });

    // Add the test ID to the list of previous tests
    const updatePreviousTestsCommand = new UpdateCommand({
      TableName: Table.Records.tableName,
      Key: {
        PK: userId,
        SK: 'Tests',
      },
      UpdateExpression: 'SET #type.inProgress = :testID',
      ExpressionAttributeValues: {
        ':testID': testID,
      },
      ExpressionAttributeNames: {
        '#type': 'full',
      },
    });

    // this will try to update if type attribute does not exist it will raise an error
    // so we will catch it and initialize the type attribute
    await dynamoDb.send(putCommand);
    try {
      await dynamoDb.send(updatePreviousTestsCommand);
    } catch (err: any) {
      if (err.name === 'ValidationException') {
        const initType = new UpdateCommand({
          TableName: Table.Records.tableName,
          Key: {
            PK: userId,
            SK: 'Tests',
          },
          UpdateExpression: 'SET #type = if_not_exists(#type, :init)',
          ExpressionAttributeValues: {
            ':init': {
              inProgress: testID,
              previous: [],
            },
          },
          ExpressionAttributeNames: {
            '#type': 'full',
          },
        });
        await dynamoDb.send(initType);
      } else {
        throw err;
      }
    }

    const listeningQuestion = await filterQuestion(questions.listening);
    console.log('Listening Question:', listeningQuestion);

    const response: startFullTestResponse = {
      testID,
      type: 'listening',
      data: { question: listeningQuestion },
    };

    const success = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(response),
    });
    await apiClient.send(success);

    return {
      statusCode: 200,
      body: 'Success',
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

const getQuestion = async (PK: string) => {
  const getIndexCommand = new GetCommand({
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the item which stores the sort keys of the available questions
    Key: {
      PK: PK,
      SK: 'index',
    },
  });

  // Retrieve the index item which contains the list of the sort keys of the available questions from the table
  const results = (await dynamoDb.send(getIndexCommand))!;
  const index = results.Item?.index
    ? results.Item?.index
    : (() => {
        throw new Error('Index not found');
      })();

  if (index.length === 0) {
    throw new Error('No questions found for ' + PK);
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

  return response.Item;
};
