import { Table } from 'sst/node/table';
import handler from '@codecatalyst-sst-app/core/handler';
import dynamoDb from '@codecatalyst-sst-app/core/dynamodb';

export const main = handler(async event => {
  const params = {
    TableName: Table.Questions.tableName,
    Key: {
      questionId: event?.pathParameters?.id,
    },
  };
  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }
  // Return the retrieved item
  return JSON.stringify(result.Item);
});
