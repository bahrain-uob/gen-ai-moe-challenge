import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const outputs=[];
  const { sk } = event.pathParameters || {};
  const pks=["ReadingP1","ReadingP2","ReadingP3"]

  for(let i=0;i<pks.length;i++){
    const params = {
      TableName: process.env.TABLE1_NAME,
      KeyConditionExpression: "MyPartitionKey = :pkValue AND MySortKey = :skValue",
      ExpressionAttributeValues: {
        ":pkValue": pks[i],
        ":skValue": sk,
      },
    };
    try {
      const results = await dynamoDb.query(params).promise();
      outputs.push(results.Items);

    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "An error occurred while querying the database." }),
      };
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(outputs),
  };  
};