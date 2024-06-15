import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  examSectionObject,
  FullTestItem,
  previousTests,
  previousTestsLists,
  previousTestsListsFrontend,
  testType,
} from './utilities/fullTestUtilities';

const client = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(client);
/**
 * This function will get the availble list of previous exams from the database
 *
 * @param event
 * @returns previosTests type
 */
export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const userId = event.requestContext.authorizer!.jwt.claims.sub;
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid user ID',
      }),
    };
  }

  const getList = new GetCommand({
    TableName: Table.Records.tableName,
    Key: {
      PK: userId,
      SK: 'Tests',
    },
  });

  const list = (await dynamoDb.send(getList)).Item as previousTestsLists;
  const newList = list as any;

  if (newList === undefined) {
    const emptyList: previousTestsLists = {
      PK: userId,
      SK: 'Tests',
    };
    return {
      statusCode: 200,
      body: JSON.stringify(emptyList),
    };
  }

  if (list.full?.inProgress) {
    const getTest = new GetCommand({
      TableName: Table.Records.tableName,
      Key: {
        PK: userId,
        SK: list.full.inProgress,
      },
    });
    const test = (await dynamoDb.send(getTest)).Item as FullTestItem;
    let progress = 0;
    if (test.speakingAnswer) {
      progress = 75;
    } else if (test.writingAnswer) {
      progress = 50;
    } else if (test.readingAnswer) {
      progress = 25;
    }
    newList.full.inProgress = {
      testId: list.full.inProgress,
      progress: progress,
    };
  } else if (list.full) {
    newList.full.inProgress = {
      testId: '',
    };
  }

  const testTypes: testType[] = ['writing', 'speaking', 'reading', 'listening'];

  const testProgress = testTypes.map((type: testType) => {
    if (list[type]?.inProgress) {
      const elapsedTime =
        Number(list[type].inProgress.split('-')[0]) - new Date().getTime();
      const percentage = Math.floor(
        (Math.min(elapsedTime, examSectionObject[type].time) /
          examSectionObject[type].time) *
          100,
      );
      newList[type].inProgress = {
        testId: list[type].inProgress,
        progress: percentage,
      };
    } else if (list[type]) {
      newList[type].inProgress = {
        testId: '',
      };
    }
  });

  const readyList = newList as previousTestsListsFrontend;

  return {
    statusCode: 200,
    body: JSON.stringify(readyList),
  };
};
