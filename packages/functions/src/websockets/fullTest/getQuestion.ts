import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { wsError } from '../../utilities';
import {
  examSections,
  FullTestItem,
  getQuestionResponse,
  RLAnswer,
  SpeakingAnswer,
  WritingAnswer,
} from '../../utilities/fullTestUtilities';
import { submit, filterQuestion } from '../../utilities/fullTestFunctions';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

/**
 * This funciton should be called when the user needs the questions for the test.
 * In both cases of completeing when quitting or starting a new section.
 * The input should be as follows:
 * {
 *  action:'fullTestGetQuestion',
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

  const exam = (await dynamoDb.send(getExam)).Item as FullTestItem;
  if (exam === undefined) {
    return wsError(apiClient, connectionId, 500, `Exam not found`);
  }
  console.log('Exam:', exam);

  for (let section = 0; section < examSections.length; section++) {
    const sectionAnswer = exam![examSections[section].answer];
    const nextSctionAnswer =
      section + 1 > 3 ? null : exam![examSections[section + 1].answer];

    if (sectionAnswer === undefined) {
      break;
    }

    // if the section is in progress
    if (sectionAnswer.status === 'In progress') {
      // calculate total time
      const totalTime = Date.now() - Number(sectionAnswer.start_time);
      console.log('Total time:', totalTime / (1000 * 60));

      // if the time is up auto submit the section
      if (totalTime > examSections[section].time) {
        //auto-submitted
        await submit(
          dynamoDb,
          userId,
          testId,
          examSections[section].answer,
          sectionAnswer.answer
            ? sectionAnswer.answer
            : examSections[section].initAnswer,
          connectionId,
          endpoint,
          true,
        );
        const autoSubmittedCommand = new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: JSON.stringify({
            type: examSections[section].type,
            data: 'Auto-Submitted',
          }),
        });
        await apiClient.send(autoSubmittedCommand);
        console.log('Auto-Submitting ', examSections[section].type);
        return { statusCode: 200, body: 'Auto-Submitted' };
      }
      // else return the question and saved answer to continue
      else {
        const newQuestion = await filterQuestion(
          exam!.questions[examSections[section].type],
        );

        const response: getQuestionResponse = {
          type: examSections[section].type,
          data: {
            question: newQuestion,
            answer: sectionAnswer,
          },
        };
        // retrieve questions
        const command = new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: JSON.stringify(response),
        });
        await apiClient.send(command);

        console.log(
          'Sending already started',
          examSections[section].type,
          'questions',
        );
      }
      return { statusCode: 200, body: 'Question sended' };
    }
    // if the section is submitted and the next section is not started
    else if (
      (sectionAnswer.status === 'Submitted' ||
        sectionAnswer.status === 'Auto-submitted') &&
      nextSctionAnswer === undefined
    ) {
      // start the next section
      console.log(examSections[section + 1].answer);

      const initAnswer: SpeakingAnswer | WritingAnswer | RLAnswer = {
        start_time: Date.now(),
        status: 'In progress',
      };
      // set the start time and status
      const updateExam = new UpdateCommand({
        TableName: Table.Records.tableName,
        Key: {
          PK: userId,
          SK: testId,
        },
        UpdateExpression: 'SET #section = :newSection',
        ExpressionAttributeValues: {
          ':newSection': initAnswer,
        },
        ExpressionAttributeNames: {
          '#section': examSections[section + 1].answer,
        },
      });
      await dynamoDb.send(updateExam);
      console.log('Starting ', examSections[section + 1].type);

      const newQuestion = await filterQuestion(
        exam!.questions[examSections[section + 1].type],
      );

      // send the new questions

      const response: getQuestionResponse = {
        type: examSections[section + 1].type,
        data: {
          question: newQuestion,
          answer: initAnswer,
        },
      };
      const command = new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify(response),
      });
      await apiClient.send(command);
      return { statusCode: 200, body: 'New question sended' };
    }
  }

  return wsError(apiClient, connectionId, 400, 'The test is finished');
};
