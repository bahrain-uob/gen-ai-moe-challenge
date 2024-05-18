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

    if (!validValues.includes(Pk)) {
      return { statusCode: 400, body: 'Value does not exist' };
    }

    // Add item to DynamoDB
    const putCommand = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await dynamoDBClient.send(putCommand);

    // Function to update the index in DynamoDB with a single request
    const updateIndex = async (
      dynamoDBClient: DynamoDBClient,
      tableName: string,
      Pk: string,
      Sk: string,
    ): Promise<void> => {
      const updateIndexCommand = new UpdateItemCommand({
        TableName: tableName,
        Key: {
          PK: { S: Pk }, // Partition key
          SK: { S: 'index' }, // Sort key for the index record
        },
        UpdateExpression:
          'SET #index = list_append(if_not_exists(#index, :init), :newSk)',
        ExpressionAttributeNames: {
          '#index': 'index', // Attribute name for the index list
        },
        ExpressionAttributeValues: {
          ':init': { L: [] }, // Initial empty list if the index does not exist
          ':newSk': { L: [{ S: Sk }] }, // New SK to append to the index list
        },
        ReturnValues: 'UPDATED_NEW', // Return the updated attributes
      });

      // console.log(
      //   'Command to be sent:',
      //   JSON.stringify(updateIndexCommand, null, 2),
      // );

      const result = await dynamoDBClient.send(updateIndexCommand);
      // console.log('Update result:', result);
    };

    // Call the updateIndex function
    await updateIndex(dynamoDBClient, tableName, Pk, Sk);

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
