import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { sk } = event.pathParameters || {};
  const pks = ["ReadingP1", "ReadingP2", "ReadingP3"];

  try {
    const queryPromises = pks.map(async (pk) => {
      const params = {
        TableName: process.env.TABLE1_NAME,
        KeyConditionExpression: "MyPartitionKey = :pkValue AND MySortKey = :skValue",
        ExpressionAttributeValues: {
          ":pkValue": pk,
          ":skValue": sk,
        },
      };
      const results = await dynamoDb.query(params).promise();
      return results.Items;
    });

    const outputs = await Promise.all(queryPromises);

    return {
      statusCode: 200,
      body: JSON.stringify(outputs),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `An error occurred while querying the database: ${error.message}` }),
    };
  }
};