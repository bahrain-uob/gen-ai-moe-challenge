import { Table, StackContext, RDS } from 'sst/constructs';

import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';
import { Fn, listMapper } from 'aws-cdk-lib';
import AWS from 'aws-sdk';

export function DBStack({ stack, app }: StackContext) {
  // Create a DynamoDB table
  const table = new Table(stack, 'Counter', {
    fields: {
      counter: 'string',
    },
    primaryIndex: { partitionKey: 'counter' },
  });


  const MyReadingExamsTable = new Table(stack, 'MyReadingExamsTable', {
    fields: {
      examID: 'number',
      uploadDate:'string',
      examPublishDate: 'string',
      review: 'number',
      numberOfTestsTaken:'number',
      passages:'string',
    },
    primaryIndex: { partitionKey: 'examID' },
  });


  const MyReadingQuestionsTable = new Table(stack, 'MyReadingQuestionsTable', {
    fields: {
      questionID: 'number',
      examID: 'number',
      questionText: 'string',
      correctAnswer: 'string',
      choices:'string',
    },
    primaryIndex: { partitionKey: 'questionID', sortKey:'examID' },
  });

  
  const MyReadingResponsesTable = new Table(stack, 'MyReadingResponsesTable', {
    fields: {
      responseID: 'number',
      questionID: 'number',
      examID: 'number',
      studentAnswer:'string',
      score: 'number',
    },
    primaryIndex: { partitionKey: 'responseID' },
  });




  // Create an RDS database
  const mainDBLogicalName = 'MainDatabase';
  // Define output/export attributes names
  const dbSecretArnOutputName = 'DBSecretArn';
  const dbClusterIdentifierOutputName = 'DBClusterIdentifier';
  // create db variable that will hold the RDS db construct
  var db: RDS;

  // if (app.stage == 'prod') {
  //   db = new RDS(stack, mainDBLogicalName, {
  //     engine: 'mysql5.7',
  //     defaultDatabaseName: 'maindb',
  //     migrations: ['.', 'packages', 'db-migrations'].join(path.sep),
  //   });

  //   // Export db secret arn and cluster identifier to be used by other stages
  //   stack.addOutputs({
  //     [dbSecretArnOutputName]: {
  //       value: db.secretArn,
  //       exportName: dbSecretArnOutputName,
  //     },
  //     [dbClusterIdentifierOutputName]: {
  //       value: db.clusterIdentifier,
  //       exportName: dbClusterIdentifierOutputName,
  //     },
  //   });
  // } else {
  //   // Import the existing secret from the exported value
  //   const existing_secret = secretsManager.Secret.fromSecretCompleteArn(
  //     stack,
  //     'ExistingSecret',
  //     Fn.importValue(dbSecretArnOutputName),
  //   );
  //   // Create an SST resource for the existing DB (does not create a new DB, references the existing one)
  //   db = new RDS(stack, 'ExistingDatabase', {
  //     engine: 'mysql5.7',
  //     defaultDatabaseName: 'maindb',
  //     migrations: ['.', 'packages', 'db-migrations'].join(path.sep),
  //     cdk: {
  //       cluster: rds.ServerlessCluster.fromServerlessClusterAttributes(
  //         stack,
  //         'ExistingCluster',
  //         {
  //           // Import the existing cluster identifier from the exported value
  //           clusterIdentifier: Fn.importValue(dbClusterIdentifierOutputName),
  //           secret: existing_secret,
  //         },
  //       ),
  //       secret: existing_secret,
  //     },
  //   });
  // }

  return { table, MyReadingExamsTable, MyReadingQuestionsTable, MyReadingResponsesTable };
}
