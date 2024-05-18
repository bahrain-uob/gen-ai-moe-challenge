///  <reference path="../../../frontend/src/utilities.ts" />
///  <reference path="../../../frontend/src/utilities/LRUtilities.ts" />

import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { gradeWriting } from 'src/grading/writing';
import { Table } from 'sst/node/table';
import { Bucket } from 'sst/node/bucket';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { gradeReadingListening } from 'src/grading/readingListening';
import { LRQuestion } from '../../../frontend/src/utilities/LRUtilities';

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
    .Attributes as FullTestItem;

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
    ReturnValues: 'ALL_NEW',
  });
  return (await dynamoDb.send(updateExam)).Attributes as FullTestItem;
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
  } else if (section === 'listeningAnswer' && test.listeningAnswer) {
    gradeReadingListening(
      test.PK,
      test.SK,
      test.questions.listening,
      test.listeningAnswer,
      connectionId,
      endpoint,
    );
  }
};

// this function removes the answers from the question and replaces
// the S3 Keys with presigned URLs
export const filterQuestion = (question: any) => {
  const newQuestion = structuredClone(question);
  const client = new S3Client();

  if (newQuestion.PK === 'writing') {
    // remove the graph description
    delete newQuestion.P1.GraphDescription;
    // get the presigned URL of the graph
    newQuestion.P1.GraphKey = generatePresignedUrl(
      question.P1.GraphKey,
      client,
    );
  } else if (newQuestion.PK === 'reading') {
    newQuestion.map((part: any) => {
      part.Questions.map((question: any) => {
        question.SubQuestions.map((subQuestion: any) => {
          if (subQuestion.CorrectAnswers) {
            delete subQuestion.CorrectAnswers;
          } else if (subQuestion.CorrectAnswer) {
            delete subQuestion.CorrectAnswer;
          }
        });
      });
    });
  } else if (newQuestion.PK === 'listening') {
    newQuestion.map((part: any) => {
      part.ScriptKey = generatePresignedUrl(part.ScriptKey, client);
      part.Questions.map((question: any) => {
        question.SubQuestions.map((subQuestion: any) => {
          if (subQuestion.CorrectAnswers) {
            delete subQuestion.CorrectAnswers;
          } else if (subQuestion.CorrectAnswer) {
            delete subQuestion.CorrectAnswer;
          }
        });
      });
    });
  } else if (newQuestion.PK === 'speaking') {
    newQuestion.map((part: any) => {
      part.Task.S3Key = generatePresignedUrl(part.Task.S3Key, client);
      part.Questions.map((question: any) => {
        if (question.S3Key) {
          question.S3Key = generatePresignedUrl(question.S3Key, client);
        }
      });
    });
  }
};

const generatePresignedUrl = async (key: string, client: S3Client) => {
  const bucket = Bucket.Uploads.bucketName;

  const input = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(input);
  const response = await getSignedUrl(client, command, {
    expiresIn: 60 * 60,
  });

  return response;
};

export interface FullTestItem {
  PK: string;
  SK: string;
  questions: questions;

  speakingAnswer?: {
    start_time: string;
    end_time?: string;
    answer?: any; // SpeakingAnswer;
    feedback?: any; // SpeakingFeedback;
    status: FeedbackStatus;
  };
  writingAnswer?: WritingAnswer;
  listeningAnswer?: RLAnswer;
  readingAnswer?: RLAnswer;
}

type FeedbackStatus = 'In progress' | 'Auto submitted' | 'Submitted';

// type ReadingSection = [ReadingPart, ReadingPart, ReadingPart];
export type questions = {
  reading: any; // ReadingSection;
  writing: WritingSection;
  listening: any; // ListeningSection;
  speaking: any; // SpeakingSection;
};

export type ListeningSection = {
  PK: string;
  SK: string;
  P1: ListeningPart;
  P2: ListeningPart;
  P3: ListeningPart;
  P4: ListeningPart;
};

type ListeningPart = {
  NumOfQuestions: number;
  ScriptKey: string;
  Questions: LRQuestion[];
};

export type ReadingSection = {
  PK: string;
  SK: string;
  P1: ReadingPart;
  P2: ReadingPart;
  P3: ReadingPart;
};

type ReadingPart = {
  NumOfQuestions: number;
  PassageTitle: string;
  Passage: string;
  Questions: LRQuestion[];
};

export interface WritingSection {
  PK: string;
  SK: string;
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

export interface RLAnswer {
  start_time: string;
  end_time?: string;
  answer?: string[] | string[][];
  feedback?: any; // ListeningFeedback | ReadingFeedback;
  status: FeedbackStatus;
}
