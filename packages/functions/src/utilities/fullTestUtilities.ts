///  <reference path="../../../frontend/src/utilities.ts" />
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { gradeWriting } from 'src/grading/writing';
import { Table } from 'sst/node/table';

export const examSections: examSection[] = [
  { type: 'listening', answer: 'listeningAnswer', time: 60 * 60 * 1000 },
  { type: 'reading', answer: 'readingAnswer', time: 60 * 60 * 1000 },
  { type: 'writing', answer: 'writingAnswer', time: 60 * 60 * 1000 },
  { type: 'speaking', answer: 'speakingAnswer', time: 60 * 60 * 1000 },
];

export type testSectionAnswer =
  | 'listeningAnswer'
  | 'readingAnswer'
  | 'writingAnswer'
  | 'speakingAnswer';

type testType = 'listening' | 'reading' | 'writing' | 'speaking';

type examSection = {
  type: testType;
  answer: testSectionAnswer;
  time: number;
};

export const autoSave = async (
  DBClient: DynamoDBDocumentClient,
  userId: string,
  testId: string,
  section: testSectionAnswer,
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
  section: testSectionAnswer,
  answer: any,
  connectionId: string,
  endpoint: string,
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
    ReturnValues: 'ALL_NEW',
  });

  const updatedExam: FullTestItem = (await DBClient.send(updateExam))
    .Attributes;

  triggerGrading(updatedExam, section, connectionId, endpoint);

  return;
};

//TODO: change the feedback type when all types are available
export const saveFeedback = async (
  PK: string,
  SK: string,
  section: testSectionAnswer,
  feedback: any,
) => {
  const client = new DynamoDBClient();
  const dynamoDb = DynamoDBDocumentClient.from(client);

  const updateExam = new UpdateCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: PK,
      SK: SK,
    },
    UpdateExpression: 'SET #section.feedback = :feedback',
    ExpressionAttributeValues: {
      ':feedback': feedback,
    },
    ExpressionAttributeNames: {
      '#section': section,
    },
  });
  return await dynamoDb.send(updateExam);
};

const triggerGrading = (
  test: FullTestItem,
  section: testSectionAnswer,
  connectionId: string,
  endpoint: string,
) => {
  if (section === 'writingAnswer' && test.writingAnswer) {
    gradeWriting(
      test.PK,
      test.SK,
      test.questions.writing,
      test.writingAnswer,
      connectionId,
      endpoint,
    );
  }
};

export interface FullTestItem {
  PK: string;
  SK: string;
  questions: {
    reading: any; // ReadingSection;
    writing: WritingSection;
    listening: any; // ListeningSection;
    speaking: any; // SpeakingSection;
  };

  speakingAnswer?: {
    start_time: string;
    end_time?: string;
    answer?: any; // SpeakingAnswer;
    feedback?: any; // SpeakingFeedback;
    status: FeedbackStatus;
  };
  writingAnswer?: WritingAnswer;
  listeningAnswer?: {
    start_time: string;
    end_time?: string;
    answer?: any; // ListeningAnswer;
    feedback?: any; // ListeningFeedback;
    status: FeedbackStatus;
  };
  readingAnswer?: {
    start_time: string;
    end_time?: string;
    answer?: any; // readingAnswer;
    feedback?: any; // readingFeedback;
    status: FeedbackStatus;
  };
}

type FeedbackStatus = 'In progress' | 'Auto submitted' | 'Submitted';

// type ReadingSection = [ReadingPart, ReadingPart, ReadingPart];

export interface WritingSection {
  P1: {
    Question: string;
    GraphDescription: string;
    GraphKey: string;
  };
  P2: {
    Question: string;
  };
}
export interface WritingAnswer {
  start_time: string;
  end_time?: string;
  answer?: any; // WritingAnswer;
  feedback?: any; // WritingFeedback;
  status: FeedbackStatus;
}
