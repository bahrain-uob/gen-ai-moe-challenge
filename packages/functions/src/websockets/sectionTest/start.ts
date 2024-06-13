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
  examSectionObject,
  previousTestsLists,
  SectionQuestions,
  SectionTestItem,
  startSectionTestResponse,
  testType,
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
 *  action:'sectionTestStart',
 *  type: 'sectionType', // listening, reading, writing, speaking
 * }
 *
 * It will return the following:
 * {
 *  testID: 'testID',
 *  type: 'sectionType',
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

  const body = JSON.parse(event.body!);
  const type = body.type as testType;
  if (!type) {
    return wsError(apiClient, connectionId, 400, 'No type provided');
  }

  // Test sections
  const testSections = ['writing', 'reading', 'listening', 'speaking'];

  if (!testSections.includes(type)) {
    return wsError(apiClient, connectionId, 400, 'Invalid test type');
  }

  try {
    // get a question from the DB
    const questions = await getQuestion(type);

    // Check if the user already has a test in progress
    const getUserTests = new GetCommand({
      TableName: Table.Records.tableName,
      Key: {
        PK: userId,
        SK: type + 'Tests',
      },
    });

    // If he has a test in progress, return an error
    const userTests = (await dynamoDb.send(getUserTests))
      .Item as previousTestsLists;
    if (!userTests[type]) {
      const initType = new UpdateCommand({
        TableName: Table.Records.tableName,
        Key: {
          PK: userId,
          SK: 'Tests',
        },
        UpdateExpression: 'SET #type = if_not_exists(#type, :init)',
        ExpressionAttributeValues: {
          ':init': {
            inProgress: '',
            previous: [],
          },
        },
        ExpressionAttributeNames: {
          '#type': type,
        },
      });
      await dynamoDb.send(initType);
    } else if (userTests[type].inProgress) {
      return wsError(
        apiClient,
        connectionId,
        400,
        'You already have a test in progress',
      );
    }

    // Generate a test ID
    const start_time = Date.now();
    const testID = `${start_time.toString()}-${uuidv4()}`;

    // Store the question in the user's record
    const item: SectionTestItem = {
      PK: userId,
      SK: testID,
      questions,
      type: type,
    };
    const answerKey = examSectionObject[type].answer;

    item[answerKey] = {
      start_time: start_time,
      status: 'In progress',
    };

    const putCommand = new PutCommand({
      TableName: Table.Records.tableName,
      Item: item,
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
        '#type': type,
      },
    });

    await dynamoDb.send(putCommand);
    await dynamoDb.send(updatePreviousTestsCommand);

    const filteredQuestion = await filterQuestion(questions);

    const response: startSectionTestResponse = {
      testID,
      type: type,
      data: { question: filteredQuestion },
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

const getQuestion = async (PK: string): Promise<SectionQuestions> => {
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

  return response.Item as SectionQuestions;
};
