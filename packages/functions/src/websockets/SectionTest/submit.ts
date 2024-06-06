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
  submitFullTestResponse,
  testType,
} from 'src/utilities/fullTestUtilities';
import { autoSave, submit } from 'src/utilities/fullTestFunctions';

/**
 * This funciton should be called when the user needs the questions for the test.
 * In both cases of completeing when quitting or starting a new section.
 * The input should be as follows:
 * {
 *  action:'sectionTestSubmit',
 *  testId: 'testId',
 *  data: {
 *      type: 'sectionType', // listening, reading, writing, speaking
 *      answer: 'answer', // this will be based on the section answer schema
 *    }
 * }
 *
 * It will output the following only when the
 * current section in progress is auto-submitted:
 * {
 *     type: 'sectionType',  // listening, reading, writing, speaking
 *     data: "Submitted",
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
  // console.log('Exam:', exam);

  const section = examSectionObject[type];
  const sectionStudentAnswer = exam[section.answer];

  if (sectionStudentAnswer === undefined) {
    return wsError(apiClient, connectionId, 400, 'No section answer found'); // TODO: Add to the error type
  }

  if (
    sectionStudentAnswer.status === 'Auto-submitted' ||
    sectionStudentAnswer.status === 'Submitted'
  ) {
    return wsError(
      apiClient,
      connectionId,
      400,
      'Section is already submitted',
    );
  }

  // if the section is in progress
  if (sectionStudentAnswer.status === 'In progress') {
    submit(
      dynamoDb,
      userId,
      testId,
      section.answer,
      answer,
      connectionId,
      endpoint,
    );
    console.log('Submitting ', type);

    const response: submitFullTestResponse = {
      type: type,
      data: 'Submitted',
    };
    const autoSubmittedCommand = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(response),
    });
    await apiClient.send(autoSubmittedCommand);
    return { statusCode: 200, body: 'Submitted' };
  }

  return wsError(apiClient, connectionId, 400, 'No section in progress');
};
