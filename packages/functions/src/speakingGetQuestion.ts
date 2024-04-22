import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient();

/*
  Lambda function handler for retrieving a question from
  DynamoDB using the questionId as the key.
*/
export async function main(event: APIGatewayProxyEvent) {
  const questionId = `${event?.pathParameters?.id}`;
  const params = {
    TableName: Table.Questions.tableName,
    Key: {
      questionId: { S: questionId },
    },
  };
  const command = new GetItemCommand(params);
  const result = await client.send(command);

  if (!result.Item) {
    throw new Error('Item not found.');
  } else {
    const questionText = result.Item.questionText.S;
    return JSON.stringify(questionText);
  }
}
