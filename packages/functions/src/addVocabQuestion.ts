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
    if (event.body == undefined) {
      return { statusCode: 400, body: 'No valid input' };
    }

    const validValues = [
      'vocabA1',
      'vocabA2',
      'vocabB1',
      'vocabB2',
      'vocabC1',
      'vocabC2',
    ];

    const item = JSON.parse(event.body);
    const Pk = item.PK.S;
    const Sk = item.SK.S;
    const tableName = Table.Records.tableName;

    if (!validValues.includes(item.PK.S)) {
      return { statusCode: 400, body: 'Value does not exist' };
    }

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
        PK: { S: Pk },
        SK: { S: 'index' },
      },
    });
    const indexResult = await dynamoDBClient.send(getIndexCommand);
    let currentIndex = indexResult.Item?.index?.L || [];

    // Append new SK to the current index
    currentIndex.push({ S: Sk });

    // Update the index record with new index list
    const updateIndexCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        PK: { S: Pk },
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
