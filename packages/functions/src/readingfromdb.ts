import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDB } from "aws-sdk";


const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async () => {
  // const { partitionKey, sortKey } = JSON.parse(event.body!);
    const params = {
        TableName: process.env.TABLE1_NAME,
        KeyConditionExpression: "MyPartitionKey = :pkValue AND MySortKey = :skValue",
        ExpressionAttributeValues: {
          ":pkValue": "Reading5", //partitionKey
          ":skValue": "2" //sortKey
        }
      };
    const results = await dynamoDb.query(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(results.Items),
    };
}
