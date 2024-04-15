import { Table, StackContext, RDS } from 'sst/constructs';

import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';
import { Fn } from 'aws-cdk-lib';

export function DBStack({ stack, app }: StackContext) {
  // Create a DynamoDB table
  const table = new Table(stack, 'Records', {
    fields: {
      PK: 'string',
      SK: 'string',
      Question: 'string',
      Answer: 'string',
      SubQuestions: 'string',
      PreviousWritingP1Qs: 'string',
      PreviousWritingP2Qs: 'string',
      PreviousReadingQs: 'string',
      PreviousListeningQs: 'string',
      PreviousSpeakingP1Qs: 'string',
      PreviousSpeakingP2Qs: 'string',
      PreviousSpeakingP3Qs: 'string',
      WritingScore: 'string',
      ListeningScore: 'string',
      SpeakingScore: 'string',
      ReadingScore: 'string',
      GrammerScore: 'string',
      VocabularyScore: 'string',
      GeneralLevel: 'string',
      Institutions: 'string',
    },
    primaryIndex: { partitionKey: 'PK', sortKey: 'SK' },
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

  return { table };
}
