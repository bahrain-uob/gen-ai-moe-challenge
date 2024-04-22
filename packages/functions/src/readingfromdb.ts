import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { pk, sk } = event.pathParameters || {};
  
  const params = {
    TableName: process.env.TABLE1_NAME,
    KeyConditionExpression: "MyPartitionKey = :pkValue AND MySortKey = :skValue",
    ExpressionAttributeValues: {
      ":pkValue": pk,
      ":skValue": sk,
    },
  };

  try {
    const results = await dynamoDb.query(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(results.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while querying the database." }),
    };
  }
};