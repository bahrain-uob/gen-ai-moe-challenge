import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";


const dynamoDb = new DynamoDB.DocumentClient();
 
export const handler: APIGatewayProxyHandlerV2 = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "examID = :examID"
  };
  const results = await dynamoDb.scan(params).promise();
 
  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}
