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
  examSections,
  autoSave,
  submit,
} from 'src/utilities/fullTestUtilities';

export const main: APIGatewayProxyHandler = async event => {
  // Get client info
  const { stage, domainName, authorizer } = event.requestContext;
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`,
  });
  const connectionId = event.requestContext.connectionId;

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
  const type = body.data.type;

  const client = new DynamoDBClient();
  const dynamoDb = DynamoDBDocumentClient.from(client);

  const getExam = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: testId,
    },
  });

  let exam;
  try {
    exam = (await dynamoDb.send(getExam)).Item;
  } catch (e) {
    return wsError(apiClient, connectionId, 500, `Exam not found: ${e}`);
  }
  console.log('Exam:', exam);

  for (let section = 0; section < examSections.length; section++) {
    const sectionAnswer = exam![examSections[section].answer];

    if (sectionAnswer === undefined) {
      break;
    }

    // if the section is in progress
    if (sectionAnswer.status === 'In progress') {
      // calculate total time
      const totalTime = Date.now() - exam![section].start_time;
      console.log('Total time:', totalTime / (1000 * 60));

      // if the time is up auto submit the section
      if (totalTime > examSections[section].time) {
        //should be auto-submitted
        submit(
          dynamoDb,
          userId,
          testId,
          examSections[section].answer,
          answer,
          true,
        );
        console.log('Auto-Submitting ', examSections[section].type);
      }
      // make sure the provided answer is for the right section
      else if (type === examSections[section].type) {
        // auto - save
        autoSave(
          dynamoDb,
          userId,
          testId,
          examSections[section].answer,
          answer,
        );
        console.log('Auto-Saving exam', examSections[section].type);
      } else {
        return wsError(
          apiClient,
          connectionId,
          400,
          'Wrong section you are in: ' + examSections[section].type,
        );
      }
      break;
    }
  }

  return { statusCode: 200, body: 'Connected' };
};
