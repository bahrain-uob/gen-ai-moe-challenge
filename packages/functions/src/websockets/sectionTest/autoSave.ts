import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { wsError } from '../../utilities';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import {
  examSectionObject,
  examSections,
  testType,
} from 'src/utilities/fullTestUtilities';
import { autoSave, submit } from 'src/utilities/fullTestFunctions';

/**
 * This funciton should be called periodically to auto save the user's answer and
 * auto submit if the time is up for the section.
 * The input should be as follows:
 * {
 *  action:'sectionTestAutoSave',
 *  testId: 'testId',
 *  data: {
 *      type: 'sectionType', // listening, reading, writing, speaking
 *      answer: 'answer', // this will be based on the section answer schema
 *    }
 * }
 *
 *
 * It will output the following only when the time is up and auto-submitted
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

  const body = JSON.parse(event.body!);
  const testId = body.testId;
  if (!testId) {
    return wsError(apiClient, connectionId, 400, 'No test ID provided');
  }
  const userId = authorizer!.userId;
  if (!userId) {
    return wsError(apiClient, connectionId, 400, 'No user specified');
  }
  const answer = body.data.answer;
  if (!answer) {
    return wsError(apiClient, connectionId, 400, 'No answer provided');
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

  const exam = (await dynamoDb.send(getExam)).Item;
  if (exam === undefined) {
    return wsError(apiClient, connectionId, 500, `Exam not found`);
  }
  const type = body.data.type as testType;
  if (exam.type !== type) {
    return wsError(apiClient, connectionId, 400, 'Invalid test type');
  }
  console.log('Exam:', exam);

  const section = examSectionObject[type];
  const sectionStudentAnswer = exam[section.answer];

  if (sectionStudentAnswer === undefined) {
    return wsError(apiClient, connectionId, 400, 'No section answer found');
  }

  // if the section is in progress
  if (sectionStudentAnswer.status === 'In progress') {
    // calculate total time
    const totalTime = Date.now() - sectionStudentAnswer.start_time;
    console.log('Total time:', totalTime / (1000 * 60));

    // if the time is up auto submit the section
    if (totalTime > section.time) {
      //should be auto-submitted
      submit(
        dynamoDb,
        userId,
        testId,
        section.answer,
        answer,
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
      return { statusCode: 200, body: 'Auto-Submitted' };
    }
    // make sure the provided answer is for the right section
    else {
      // auto - save
      autoSave(dynamoDb, userId, testId, section.answer, answer);
      console.log('Auto-Saving exam', section.type);
      return { statusCode: 200, body: 'Auto-Saved' };
    }
  }

  return wsError(apiClient, connectionId, 400, 'The test is finished');
};
