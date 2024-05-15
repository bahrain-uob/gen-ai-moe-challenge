import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table';

const dynamoDBClient = new DynamoDBClient({});

export const main: APIGatewayProxyHandlerV2 = async event => {
  try {
    const item = JSON.parse(event.body || '{}');
    const tableName = Table.Records.tableName;

    // Add item to DynamoDB
    const putCommand = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await dynamoDBClient.send(putCommand);

    // Retrieve the current index
    const getIndexCommand = new GetItemCommand({
      TableName: tableName,
      Key: {
        PK: { S: item.PK.S },
        SK: { S: 'index' },
      },
    });
    const indexResult = await dynamoDBClient.send(getIndexCommand);
    let currentIndex = indexResult.Item?.index?.L || [];

    // Append new SK to the current index
    currentIndex.push({ S: item.SK.S });

    // Update the index record with new index list
    const updateIndexCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        PK: { S: item.PK.S },
        SK: { S: 'index' },
      },
      UpdateExpression: 'SET #index = :newIndex',
      ExpressionAttributeNames: {
        '#index': 'index',
      },
      ExpressionAttributeValues: {
        ':newIndex': { L: currentIndex },
      },
    });
    await dynamoDBClient.send(updateIndexCommand);

    return response(200, 'Question added and index updated successfully');
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof Error) {
      return response(500, `Error: ${error.message}`);
    } else {
      return response(500, 'Unknown error occurred');
    }
  }
};

function response(statusCode: number, message: string) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  };
}
