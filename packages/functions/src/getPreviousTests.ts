import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { previousTestTypes, previousTests, testType } from './utilities/fullTestUtilities';

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);
/**
 * This function will get the availble list of previous exams from the database
 * 
 * @param event 
 * @returns previosTests type
 */
export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {

  const testType: testType | 'full' = event.pathParameters?.type as testType | 'full';
  const testTypes = ['full', 'writing', 'speaking', 'reading', 'listening'];

  if (!testType || !testTypes.includes(testType)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid test type',
      }),
    };
  }

  const userId = event.requestContext.authorizer!.jwt.claims.sub;
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid user ID',
      }),
    };
  }

  const getList = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testType + 'Tests',
    },
  });

  const list = (await dynamoDb.send(getList)).Item as previousTests;
  if (list === undefined) {
    const emptyList: previousTests = {
        PK: userId,
        SK: testType + 'Tests' as previousTestTypes,
        inProgress: '',
        previous: []
    }
    return {
      statusCode: 200,
      body: JSON.stringify(emptyList),
    };
  }

  if(!list.previous){
    list.previous = [];
  }

  if(!list.inProgress){
    list.inProgress = '';
  }

  return {
    statusCode: 200,
    body: JSON.stringify(list),
  };
};