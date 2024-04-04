import { Table, StackContext, RDS } from 'sst/constructs';

import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as path from 'path';
import { Fn, listMapper } from 'aws-cdk-lib';
import AWS from 'aws-sdk';

export function DBStack({ stack, app }: StackContext) {

  const readingExamsTable = new Table(stack, 'MyReadingExamsTable', {
    fields: {
      examID: 'number',
      uploadDate:'string',
      examPublishDate: 'string',
      review: 'number',
      numberOfTestsTaken:'number',
    },
    primaryIndex: { partitionKey: 'examID' },
  });

  

  const readingQuestionsTable = new Table(stack, 'MyReadingQuestionsTable', {
    fields: {
      questionID: 'number',
      examID: 'number',
      questionText: 'string',
      correctAnswer: 'string',
      choices:'string'
    },
    primaryIndex: { partitionKey: 'questionID', sortKey:'examID' },
  });

  
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
  // Function to add an exam to the readingExamsTable
const addExam = async (exam: { examID: string; uploadDate: string; examPublishDate: string; review: string; numberOfTestsTaken: string; }) => {
  try {
    const params = {
      TableName: 'MyReadingExamsTable',
      Item: exam,
    };

    await dynamodb.put(params).promise();
    console.log('Exam added successfully');
  } catch (error) {
    console.error('Failed to add exam:', error);
  }
};

// Function to add a question to the readingQuestionsTable
const addQuestion = async (question: { questionID: string; examID: string; questionText: string; correctAnswer: string; }) => {
  try {
    const params = {
      TableName: 'MyReadingQuestionsTable',
      Item: question,
    };

    await dynamodb.put(params).promise();
    console.log('Question added successfully');
  } catch (error) {
    console.error('Failed to add question:', error);
  }
};

// Add random exams to the readingExamsTable
for (let i = 1; i <= 10; i++) {
  const exam = {
    examID: i.toString(),
    uploadDate: '2022-01-01',
    examPublishDate: '2022-01-02',
    review: (Math.floor(Math.random() * 5) + 1).toString(),
    numberOfTestsTaken: (Math.floor(Math.random() * 100) + 1).toString(),
  };

  addExam(exam);
}

// Add random questions related to the exams in the readingQuestionsTable
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 5; j++) {
    const question = {
      questionID: j.toString(),
      examID: i.toString(),
      questionText: `Question ${j} for Exam ${i}`,
      correctAnswer: 'Option A',
    };

    addQuestion(question);
  }
}





  const readingResponsesTable = new Table(stack, 'MyReadingResponsesTable', {
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

  return { readingExamsTable, readingQuestionsTable, readingResponsesTable };
}
