import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  previousTests,
  previousTestsLists,
} from './utilities/fullTestUtilities';

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
      SK: 'Tests',
    },
  });

  const list = (await dynamoDb.send(getList)).Item as previousTestsLists;

  if (list === undefined) {
    const emptyList: previousTestsLists = {
      PK: userId,
      SK: 'Tests',
    };
    return {
      statusCode: 200,
      body: JSON.stringify(emptyList),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(list),
  };
};
