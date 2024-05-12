import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { wsError } from '../utilities';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

export const main: APIGatewayProxyHandler = async event => {
  // Get client info
  const { stage, domainName, authorizer } = event.requestContext;
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`,
  });
  const connectionId = event.requestContext.connectionId;

  const body = JSON.parse(event.body!);
  const testId = body.testId;
  if (!testId) {
    return wsError(apiClient, connectionId, 400, 'No test ID provided');
  }

  const userId = authorizer!.userId;
  if (!userId) {
    return wsError(apiClient, connectionId, 400, 'No user specified');
  }
  const answer = body.data;

  const client = new DynamoDBClient();
  const dynamoDb = DynamoDBDocumentClient.from(client);

  const getExam = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
  });

  const examSections = [
    'listeningAnswer',
    'readingAnswer',
    'writingAnswer',
    'speakingAnswer',
  ];

  let exam;
  try {
    exam = (await dynamoDb.send(getExam)).Item;
  } catch (e) {
    return wsError(apiClient, connectionId, 500, `Exam not found: ${e}`);
  }
  console.log('Exam:', exam);

  const examTiming: examTiming = {
    listeningAnswer: 60 * 60 * 1000,
    readingAnswer: 60 * 60 * 1000,
    writingAnswer: 60 * 60 * 1000,
    speakingAnswer: 60 * 60 * 1000,
  };

  for (let section of examSections) {
    if (exam![section] && exam![section].status === 'In progress') {
      const totalTime = Date.now() - exam![section].start_time;
      console.log('Total time:', totalTime);

      if (totalTime > examTiming[section]) {
        //should be auto-submitted
        console.log('Auto-submitting exam');
      } else {
        // auto - save
        autoSave(dynamoDb, userId, testId, section, answer);
      }
    }
  }

  return { statusCode: 200, body: 'Connected' };
};

type examTiming = {
  listeningAnswer: number;
  readingAnswer: number;
  writingAnswer: number;
  speakingAnswer: number;
  [key: string]: number;
};

const autoSave = async (
  DBClient: DynamoDBDocumentClient,
  userId: string,
  testId: string,
  section: string,
  answer: any,
) => {
  const updateExam = new UpdateCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
    UpdateExpression: `SET ${section}.answer = :answer`,
    ExpressionAttributeValues: {
      ':answer': answer,
    },
  });

  return await DBClient.send(updateExam);
};
