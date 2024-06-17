import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

interface UpdateParams {
  TableName: string;
  Key: {
    userId: string;
    plan: string;
  };
  UpdateExpression: string;
  ExpressionAttributeValues: {
    [key: string]: any; // Allow any type of value
  };
  ReturnValues: 'ALL_NEW';
}

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  console.log('Lambda function invoked'); // Log when the function is invoked
  console.log('Event: ', JSON.stringify(event)); // Log the event object

  const data = JSON.parse(event.body!);
  const planType = data.planType;

  // Accessing user ID from the event object
  const userId = event.requestContext.authorizer?.jwt.claims.sub;

  if (!userId) {
    console.log('User ID not found in the token');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User ID not found in the token' }),
    };
  }

  const tableName = process.env.TABLE_NAME;

  const getParams = {
    TableName: tableName!,
    Key: {
      userId: userId,
      plan: planType,
    },
  };

  try {
    // Fetch the existing record
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

    // Update the record
    const updateParams: UpdateParams = {
      TableName: tableName!,
      Key: {
        userId: userId,
        plan: planType,
      },
      UpdateExpression: `set ${planType} = :value`,
      ExpressionAttributeValues: {
        ':value': 'test',
      },
      ReturnValues: 'ALL_NEW',
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
    console.log('Error updating item: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not update item',
        details: (error as Error).message,
      }),
    };
  }
};
