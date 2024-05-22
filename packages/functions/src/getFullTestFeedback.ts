import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FullTestItem } from './utilities/fullTestUtilities';

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const testSK = event.pathParameters?.SK;

  const userId = event.requestContext.authorizer!.jwt.claims.sub;
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid user ID',
      }),
    };
  }
  const getExam = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testSK,
    },
  });

  const exam = (await dynamoDb.send(getExam)).Item as FullTestItem;
  if (exam === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Exam not found' }),
    };
  }

  if (exam.speakingAnswer === undefined || exam.writingAnswer === undefined) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Exam not finished' }),
    };
  }

  if (
    exam.speakingAnswer.feedback === undefined ||
    exam.writingAnswer.feedback === undefined
  ) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Grading not completed yet' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ fullItem: exam }),
  };
};
