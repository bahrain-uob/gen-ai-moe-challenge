import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { wsError } from '../../utilities';
import {
  examSectionObject,
  getQuestionResponse,
  SectionTestItem,
  testType,
} from '../../utilities/fullTestUtilities';
import { submit, filterQuestion } from '../../utilities/fullTestFunctions';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

/**
 * This funciton should be called when the user needs the questions for the test.
 * In both cases of completeing when quitting or starting a new section.
 * The input should be as follows:
 * {
 *  action:'sectionTestGetQuestion',
 *  testId: 'testId',
 * }
 *
 * It will return the following:
 * {
 *  type: 'sectionType', // listening, reading, writing, speaking
 *  data: {
 *    question: 'question', // this will be based on the section question schema
 *                          // the same as the item in DB
 *    answer: 'answer', // this will get returned only when returning after quitting
 * }
 *
 * It will output the following only when the
 * current section in progress is auto-submitted:
 * {
 *     type: 'sectionType',  // listening, reading, writing, speaking
 *     data: "Auto-Submitted",
 * }
 */

export const main: APIGatewayProxyHandler = async event => {
  // Get client info
  const { stage, domainName, authorizer } = event.requestContext;
  const endpoint = `https://${domainName}/${stage}`;
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: endpoint,
  });
  const connectionId = event.requestContext.connectionId!;

  // Ensure message has a body
  if (event.body == undefined) {
    return await wsError(apiClient, connectionId, 400, 'No body found');
  }
  const body = JSON.parse(event.body);

  const testId = body.testId;
  if (!testId) {
    return wsError(apiClient, connectionId, 400, 'No test ID provided');
  }

  const userId = authorizer!.userId;
  if (!userId) {
    return wsError(apiClient, connectionId, 400, 'No user specified');
  }

  const client = new DynamoDBClient();
  const dynamoDb = DynamoDBDocumentClient.from(client);

  const getExam = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
  });

  const exam = (await dynamoDb.send(getExam)).Item as SectionTestItem;
  if (exam === undefined) {
    return wsError(apiClient, connectionId, 500, `Exam not found`);
  }
  const type = exam.type as testType;

  console.log('Exam:', exam);

  const section = examSectionObject[type];
  const sectionStudentAnswer = exam[section.answer];

  if (sectionStudentAnswer === undefined) {
    return wsError(apiClient, connectionId, 400, 'No section answer found');
  }

  // if the section is in progress
  if (sectionStudentAnswer.status === 'In progress') {
    // calculate total time
    const totalTime = Date.now() - Number(sectionStudentAnswer.start_time);
    console.log('Total time:', totalTime / (1000 * 60));

    // if the time is up auto submit the section
    if (totalTime > section.time) {
      //auto-submitted
      const submitValue = submit(
        dynamoDb,
        userId,
        testId,
        section.answer,
        sectionStudentAnswer.answer
          ? sectionStudentAnswer.answer
          : section.initAnswer,
        connectionId,
        endpoint,
        true,
      );
      const autoSubmittedCommand = new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify({
          type: type,
          data: 'Auto-Submitted',
        }),
      });
      await apiClient.send(autoSubmittedCommand);
      console.log('Auto-Submitting ', type);
      await submitValue;
      return { statusCode: 200, body: 'Auto-Submitted' };
    }
    // else return the question and saved answer to continue
    else {
      const newQuestion = await filterQuestion(exam.questions);

      const response: getQuestionResponse = {
        type: type,
        data: {
          question: newQuestion,
          answer: sectionStudentAnswer,
        },
      };
      // retrieve questions
      const command = new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify(response),
      });
      await apiClient.send(command);

      console.log('Sending already started', type, 'questions');
    }
    return { statusCode: 200, body: 'Question sended' };
  }

  return wsError(apiClient, connectionId, 400, 'The test is finished');
};
