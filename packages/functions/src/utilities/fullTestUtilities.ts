import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

export type examTiming = {
  listeningAnswer: number;
  readingAnswer: number;
  writingAnswer: number;
  speakingAnswer: number;
  [key: string]: number;
};

export const autoSave = async (
  DBClient: DynamoDBDocumentClient,
  userId: string,
  testId: string,
  section: string,
  answer: any,
) => {
  const updateExam = new UpdateCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
    UpdateExpression: `SET ${section}.answer = :answer`,
    ExpressionAttributeValues: {
      ':answer': answer,
    },
  });

  return await DBClient.send(updateExam);
};

export const submit = async (
  DBClient: DynamoDBDocumentClient,
  userId: string,
  testId: string,
  section: string,
  answer: any,
  autoSubmitted: boolean = false,
) => {
  const updateExam = new UpdateCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
    UpdateExpression:
      'SET #section.answer = :answer, #section.#stu = :status, #section.end_time = :end_time',
    ExpressionAttributeValues: {
      ':answer': answer,
      ':status': autoSubmitted ? 'Auto-submitted' : 'Submitted',
      ':end_time': Date.now(),
    },
    ExpressionAttributeNames: {
      '#section': section,
      '#stu': 'status',
    },
  });

  return await DBClient.send(updateExam);
};
