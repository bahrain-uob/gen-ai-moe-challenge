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

  // Define valid values for planType and level
  const validPlanTypes = [
    'vocab',
    'speaking',
    'writing',
    'reading',
    'listening',
  ];
  const validLevels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];

  // Validate planType
  const planType = data.planType;
  console.log('Received plan type:', planType);
  if (!validPlanTypes.includes(planType.toLowerCase())) {
    console.error('Invalid plan type:', planType);
    throw new Error(`Invalid plan type: ${planType}`);
  }

  // Validate level
  const level = data.level;
  console.log('Received level:', level);
  if (!validLevels.includes(level.toLowerCase())) {
    console.error('Invalid level:', level);
    throw new Error(`Invalid level: ${level}`);
  }

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
    // Determine the type suffix for challengesKey
    let typeSuffix;
    if (
      planType.toLowerCase() === 'reading' ||
      planType.toLowerCase() === 'vocab'
    ) {
      typeSuffix = 'reading';
    } else {
      typeSuffix = planType.toLowerCase();
    }

    // Fetch challenges from fixed PK and SK
    const challengesKey = {
      PK: `plan-B2-${typeSuffix}`,
      SK: '0',
    };

    console.log('Fetching challenges...');
    const challengesGetParams = { TableName: tableName, Key: challengesKey };
    const challengesGetCommand = new GetCommand(challengesGetParams);
    const challengesResult = await dynamoDb.send(challengesGetCommand);
    const challengesItem = challengesResult.Item;

    if (!challengesItem || !challengesItem.challenges) {
      console.log('Challenges not found');
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Challenges not found' }),
      };
    }

    const challenges = challengesItem.challenges;
    console.log('Challenges fetched:', challenges);

    console.log('Item found, updating...');
    const updateParams = {
      TableName: tableName,
      Key: key,
      UpdateExpression: `set #planType = :planType`,
      ExpressionAttributeNames: {
        '#planType': planType,
      },
      ExpressionAttributeValues: {
        ':planType': {
          challenges: challenges,
          level: level,
        },
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
