import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { PostConfirmationTriggerHandler } from 'aws-lambda';
import { Table } from 'sst/node/table';

/**
 * This function is called after a user has been confirmed to intiialize the
 * user in the database
 *
 * See https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html
 */
const handler: PostConfirmationTriggerHandler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event));
  console.log('Received context:', JSON.stringify(context));
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    // Add the user to the instituition students list

    //TODO: Hanndle the case of DB error

    const client = new DynamoDBClient();
    const dynamoDb = DynamoDBDocumentClient.from(client);
    const command = new UpdateCommand({
      TableName: Table.Records.tableName,
      Key: {
        PK: 'AGGREGATES',
        SK: event.request.userAttributes['custom:Institution'],
      },
      // if students record does not exist, create it and add user ID to the list
      UpdateExpression:
        'SET students = list_append(if_not_exists(students, :init), :ID)',
      ExpressionAttributeValues: {
        ':init': [],
        ':ID': [event.userName],
      },
      ReturnValues: 'NONE',
    });

    const response = await dynamoDb.send(command);
    console.log(response);
  }

  return event;
};

export { handler };
