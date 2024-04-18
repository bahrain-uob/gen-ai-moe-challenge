import { Bucket, Table, StackContext, RDS } from 'sst/constructs';

import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';
import { Fn } from 'aws-cdk-lib';

export function DBStack({ stack, app }: StackContext) {
  // Create a DynamoDB table
  const table = new Table(stack, 'Counter', {
    fields: {
      counter: 'string',
    },
    primaryIndex: { partitionKey: 'counter' },
  });

  const uploads_bucket = new Bucket(stack, 'Uploads');
  const transcription_bucket = new Bucket(stack, 'Transcripts');

  const questions_table = new Table(stack, 'Questions', {
    fields: {
      questionId: 'string',
    },
    primaryIndex: { partitionKey: 'questionId' },
  });

  const feedback_table = new Table(stack, 'ResponseFeedback', {
    fields: {
      feedbackId: 'string',
      feedbackScore: 'string',
      feedbackText: 'string',
    },
    primaryIndex: { partitionKey: 'feedbackId' },
  });

  uploads_bucket.addNotifications(stack, {
    fileUpload: {
      function: {
        handler: 'packages/functions/src/transcribe.main',
        environment: { outBucket: transcription_bucket.bucketName },
      },
      events: ['object_created'],
      filters: [{ suffix: '.mp3' }],
    },
  });
  uploads_bucket.attachPermissions(['s3', 'transcribe']);

  transcription_bucket.addNotifications(stack, {
    fileUpload: {
      function: {
        handler: 'packages/functions/src/feedback.main',
        environment: {
          bucketName: uploads_bucket.bucketName,
          tableName: feedback_table.tableName,
        },
      },
      events: ['object_created'],
      filters: [{ suffix: '.json' }],
    },
  });
  transcription_bucket.attachPermissions(['s3', 'bedrock', feedback_table]);

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

  return {
    table,
    uploads_bucket,
    transcription_bucket,
    questions_table,
    feedback_table,
  };
}
