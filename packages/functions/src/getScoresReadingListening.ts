import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async event => {
  const { section, sk } = event.pathParameters || {};
  console.log('reached');
  if (!section || !sk) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing section or sk' }),
    };
  }
  const sortKey = section + sk;

  try {
    const params = {
      TableName: process.env.TABLE1_NAME,
      KeyConditionExpression:
        'MyPartitionKey = :pkValue AND MySortKey = :skValue',
      ExpressionAttributeValues: {
        ':pkValue': 'student8',
        ':skValue': sortKey,
      },
    };

    const results = await dynamoDb.query(params).promise();
    const items = results.Items;
    console.log('items: ', items);
    if (!items || items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No scores found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(items[0]),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `An error occurred while querying the database: ${error.message}`,
      }),
    };
  }
};
