import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('Lambda function invoked');
  console.log('Event body:', event.body);

  let data;
  try {
    if (!event.body) {
      throw new Error('Request body is missing');
    }
    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf-8')
      : event.body;
    data = JSON.parse(body);
  } catch (err) {
    console.error('Error parsing request body:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    };
  }

  const planType = data.planType; // Value sent from client
  console.log('Received plan type:', planType);

  const userId = event.requestContext.authorizer?.jwt.claims.sub;
  console.log('user id: ', userId);

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User ID not found in the token' }),
    };
  }

  const tableName = Table.Records.tableName;

  if (!tableName) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Table name not set' }),
    };
  }

  const key = {
    PK: userId,
    SK: 'plan', // Fixed SK value
  };

  try {
    console.log('Fetching existing item...');
    const getParams = { TableName: tableName, Key: key };
    const getCommand = new GetCommand(getParams);
    const result = await dynamoDb.send(getCommand);
    const existingItem = result.Item;

    if (!existingItem) {
      console.log('Item not found');
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    console.log('Item found, updating...');
    const updateParams = {
      TableName: tableName,
      Key: key,
      UpdateExpression: `set #planType = :value`,
      ExpressionAttributeNames: {
        '#planType': planType,
      },
      ExpressionAttributeValues: {
        ':value': 'test', // Update with the value you want
      },
      ReturnValues: 'ALL_NEW' as const,
    };

    const updateCommand = new UpdateCommand(updateParams);
    const updateResult = await dynamoDb.send(updateCommand);
    console.log('Item updated successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        updatedAttributes: updateResult.Attributes,
      }),
    };
  } catch (error) {
    console.error('Error updating item:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not update item',
        details: error.message,
      }),
    };
  }
};
