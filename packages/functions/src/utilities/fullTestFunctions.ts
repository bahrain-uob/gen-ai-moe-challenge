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

  await triggerGrading(updatedExam, section, connectionId, endpoint, DBClient);

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

const triggerGrading = async (
  test: FullTestItem,
  section: testSectionAnswer,
  connectionId: string,
  endpoint: string,
  DBClient: DynamoDBDocumentClient,
) => {
  if (section === 'writingAnswer' && test.writingAnswer) {
    await gradeWriting(
      test.PK,
      test.SK,
      test.questions.writing,
      test.writingAnswer,
      connectionId,
      endpoint,
    );
  } else if (section === 'listeningAnswer' && test.listeningAnswer) {
    await gradeReadingListening(
      test.PK,
      test.SK,
      test.questions.listening,
      test.listeningAnswer,
      connectionId,
      endpoint,
    );
  } else if (section === 'readingAnswer' && test.readingAnswer) {
    await gradeReadingListening(
      test.PK,
      test.SK,
      test.questions.reading,
      test.readingAnswer,
      connectionId,
      endpoint,
    );
  } else if (section === 'speakingAnswer' && test.speakingAnswer) {
    await gradeSpeaking(
      test.PK,
      test.SK,
      test.questions.speaking,
      test.speakingAnswer,
      connectionId,
      endpoint,
      true,
    );
    await endFullTest(DBClient, test.PK, test.SK);
  }
};

const endFullTest = async (
  DBClient: DynamoDBDocumentClient,
  PK: string,
  SK: string,
) => {
  // Add the test ID to the list of previous tests
  // And remove it from the current test
  const updateTestsCommand = new UpdateCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: PK,
      SK: 'fullTests',
    },
    UpdateExpression:
      'SET inProgress = :empty, previous = list_append(if_not_exists(previous, :init), :testID)',
    ExpressionAttributeValues: {
      ':testID': [SK],
      ':init': [],
      ':empty': '',
    },
  });
  await DBClient.send(updateTestsCommand);
};

// this function removes the answers from the question and replaces
// the S3 Keys with presigned URLs
export const filterQuestion = async (question: any) => {
  const newQuestion = structuredClone(question);
  const client = new S3Client();

  if (newQuestion.PK === 'writing') {
    // get the presigned URL of the graph
    newQuestion.P1.GraphKey = await generatePresignedUrl(
      question.P1.GraphKey,
      client,
    );
  } else if (newQuestion.PK === 'reading') {
    // for (let part of ['P1', 'P2', 'P3']) {
    //   for (let question of newQuestion[part].Questions) {
    //     for (let subQuestion of question.SubQuestions) {
    //       if (subQuestion.CorrectAnswers) {
    //         console.log('deleting correct answers');
    //         delete subQuestion.CorrectAnswers;
    //       } else if (subQuestion.CorrectAnswer) {
    //         console.log('deleting correct answer');
    //         delete subQuestion.CorrectAnswer;
    //       }
    //     }
    //   }
    // }
  } else if (newQuestion.PK === 'listening') {
    for (let part of ['P1', 'P2', 'P3', 'P4']) {
      newQuestion[part].ScriptKey = await generatePresignedUrl(
        newQuestion[part].ScriptKey,
        client,
      );
      for (let question of newQuestion[part].Questions) {
        if (question.QuestionType === 'Diagram Completion') {
          question.Diagram = await generatePresignedUrl(
            question.Diagram,
            client,
          );
        }
        // for (let subQuestion of question.SubQuestions) {
        //   if (subQuestion.CorrectAnswers) {
        //     delete subQuestion.CorrectAnswers;
        //   } else if (subQuestion.CorrectAnswer) {
        //     delete subQuestion.CorrectAnswer;
        //   }
        // }
      }
    }
  } else if (newQuestion.PK === 'speaking') {
    for (let part of ['P1', 'P2', 'P3']) {
      console.log(newQuestion[part].Task.S3key);
      newQuestion[part].Task.S3key = await generatePresignedUrl(
        newQuestion[part].Task.S3key,
        client,
      );
      for (let question of newQuestion[part].Questions) {
        if (question.S3key) {
          question.S3key = await generatePresignedUrl(question.S3key, client);
        }
      }
    }
  }

  return newQuestion;
};

const generatePresignedUrl = async (key: string, client: S3Client) => {
  const bucket = process.env.speakingPollyBucket;

  const input = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(input);
  let response;
  try {
    response = await getSignedUrl(client, command, {
      expiresIn: 60 * 60,
    });
  } catch (err) {
    console.log('Presigned URL error: ', err);
  }

  return response;
};
