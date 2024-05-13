import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table';

const dynamoDBClient = new DynamoDBClient({});

export const main: APIGatewayProxyHandlerV2 = async event => {
  try {
    const item = JSON.parse(event.body || '{}');
    console.log('Parsed item:', item);

    const tableName = Table.Records.tableName;
    console.log(tableName);
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    await dynamoDBClient.send(command);
    return response(200, 'Question added successfully');
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
