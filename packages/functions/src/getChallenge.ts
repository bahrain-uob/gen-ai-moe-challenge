import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Table } from 'sst/node/table';

const dynamoDb = new DynamoDB.DocumentClient();

interface Challenge {
  contextTitle: string;
  context: string;
  contextAudio: string;
  type: string;
  level: string;
  tasks: Task[];
}

interface Task {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: string;
  SubQuestions: SubQuestion[];
  List?: string;
  ListTitle?: string;
}

interface SubQuestion {
  Choices: string[];
  CorrectAnswer: string;
  QuestionText: string;
}

export const getChallenge: APIGatewayProxyHandler = async event => {
  const challengeID = event.pathParameters?.challengeID;

  const userId = event.requestContext.authorizer!.jwt.claims.sub;
  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid user ID',
      }),
    };
  }

  if (!challengeID) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing challengeID in path parameters',
      }),
    };
  }

  // Assuming challengeID is formatted as "PK-SK"
  const [PK, SK] = challengeID.split('-');
  if (!PK || !SK) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid challengeID format' }),
    };
  }

  const params = {
    TableName: Table.Records.tableName,
    Key: {
      PK: PK,
      SK: SK,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Challenge not found' }),
      };
    }

    const challenge: Challenge = result.Item as Challenge;

    return {
      statusCode: 200,
      body: JSON.stringify(challenge),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
