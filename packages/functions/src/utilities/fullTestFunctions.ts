import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { gradeWriting } from 'src/grading/writing';
import { Table } from 'sst/node/table';
import { Bucket } from 'sst/node/bucket';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { gradeReadingListening } from 'src/grading/readingListening';
import { gradeSpeaking } from 'src/grading/speaking';
import { FullTestItem, testSectionAnswer } from './fullTestUtilities';

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
  } else if (section === 'readingAnswer' && test.readingAnswer) {
    gradeReadingListening(
      test.PK,
      test.SK,
      test.questions.reading,
      test.readingAnswer,
      connectionId,
      endpoint,
    );
  } else if (section === 'speakingAnswer' && test.speakingAnswer) {
    gradeSpeaking(
      test.PK,
      test.SK,
      test.questions.speaking,
      test.speakingAnswer,
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
        if (question.QuestionType === 'Diagram Completion') {
          question.Diagram = generatePresignedUrl(question.Diagram, client);
        }
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

  return newQuestion;
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
