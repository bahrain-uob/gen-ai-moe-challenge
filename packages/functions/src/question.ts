import { DynamoDB } from 'aws-sdk';
import { Table } from 'sst/node/table';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDb = new DynamoDB.DocumentClient();

export const main = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const PK = event.pathParameters?.questionType;
  const possibleQuestionTypes = ["WritingP1", "WritingP2", "Reading", "Listening", "SpeakingP1", "SpeakingP2", "SpeakingP3"];

  //validate the question type
    if (!PK || !possibleQuestionTypes.includes(PK)) {
        return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Invalid question type',
        }),
        };
    }

  const queryParams = {
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the row where the "PK" column is equal to the questionType
    ExpressionAttributeValues: {
      ':PK': PK,
    },
    KeyConditionExpression: 'PK = :PK',

    // Retrieve only the "SK" column
    ProjectionExpression: 'SK',
  };

  const getParams = {
    // Get the table name from the environment variable
    TableName: Table.Records.tableName,
    // Get the row where the counter is called "clicks"
    Key: {
      PK: PK,
      SK: '',
    },
  };
  try {
    const results = (await dynamoDb.query(queryParams).promise())!;
    let randomItemNumber = getRandomInt(0, results.Count! - 1);
    getParams.Key.SK = results.Items![randomItemNumber].SK;

    const response = await dynamoDb.get(getParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        Question: await response.Item?.Question,
        SubQuestions: await response.Item?.SubQuestions ? response.Item?.SubQuestions : '',
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};

function getRandomInt(min: number, max: number): number {
  //Will return a number inside the given range, inclusive of both minimum and maximum
  //i.e. if min=0, max=20, returns a number from 0-20
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
