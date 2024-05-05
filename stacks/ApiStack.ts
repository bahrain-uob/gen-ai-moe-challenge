import { Api, StackContext, use, Service, WebSocketApi } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';
import { AuthStack } from './AuthStack';
import { GrammarToolStack } from './GrammarToolStack';

export function ApiStack({ stack }: StackContext) {
  const { table, uploads_bucket, feedback_table, myTable, speakingPollyBucket } =
    use(DBStack);
  const { auth } = use(AuthStack);
  const { grammarToolDNS } = use(GrammarToolStack);

  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'jwt',
      function: {
        environment: {
          TABLE1_NAME: myTable.tableName,
        },
        // Bind the table name to our API
        bind: [table],
      },
    },
    authorizers: {
      jwt: {
        type: 'user_pool',
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    routes: {
      // Sample TypeScript lambda function
      'POST /': 'packages/functions/src/lambda.main',
      // Function that returns a random question
      'GET /question/{questionType}': 'packages/functions/src/question.main',
      //example for using the language tool service
      'GET /languageTool': {
        function: {
          handler: 'packages/functions/src/languageTool.main',
          environment: {
            grammerToolDNS: grammarToolDNS,
          },
        },
      },
      // Speaking getting a presigned URL to upload the response
      'POST /generate-presigned-url': {
        function: {
          handler: 'packages/functions/src/generatePresignedUrl.main',
          permissions: ['s3:PutObject'],
          environment: {
            audioResponseBucket: uploads_bucket.bucketName,
          },
        },
      },
      // Speaking getting the polly audio
      'GET /speakingRecording/{key}': {
        function: {
          handler: 'packages/functions/src/speakingRecording.main',
          permissions: ['s3:GetObject'],
          environment: {
            speakingPollyBucket: speakingPollyBucket.bucketName,
          },
        },
      },
      // Speaking grading lambda function
      'POST /speaking': {
        function: {
          handler: 'packages/functions/src/speaking.main',
          permissions: [
            's3:GetObject',
            's3:PutObject',
            'transcribe:StartTranscriptionJob',
            'transcribe:GetTranscriptionJob',
            'bedrock:InvokeModel',
            'dynamodb:PutItem',
          ],
          environment: {
            speakingUploadBucketName: uploads_bucket.bucketName,
            feedbackTableName: feedback_table.tableName,
          },
          timeout: '120 seconds',
        },
      },
      // Grade both writing tasks
      'POST /grade-writing': {
        function: {
          handler: 'packages/functions/src/gradingWriting.main',
          permissions: ['bedrock:InvokeModel'],
          timeout: '120 seconds',
          environment: {
            grammerToolDNS: grammarToolDNS,
          },
        },
      }, //testing bedrock api for writing
      //api endpoint for retrieving reading questions
      'GET /{section}/{sk}':
        'packages/functions/src/getQuestionsReadingListening.handler',
      'POST /answers/{section}/{sk}':
        'packages/functions/src/GradingReadingListening.handler',
      'GET /scores/{section}/{sk}':
        'packages/functions/src/getScoresReadingListening.handler',

      // Sample Pyhton lambda function
      'GET /': {
        function: {
          handler: 'packages/functions/src/sample-python-lambda/lambda.main',
          runtime: 'python3.11',
          timeout: '60 seconds',
        },
        authorizer: 'none',
      },
    },
  });
  api.attachPermissions([myTable]);

  // cache policy to use with cloudfront as reverse proxy to avoid cors
  // https://dev.to/larswww/real-world-serverless-part-3-cloudfront-reverse-proxy-no-cors-cgj
  const apiCachePolicy = new CachePolicy(stack, 'CachePolicy', {
    minTtl: Duration.seconds(0), // no cache by default unless backend decides otherwise
    defaultTtl: Duration.seconds(0),
    headerBehavior: CacheHeaderBehavior.allowList(
      'Accept',
      'Authorization',
      'Content-Type',
      'Referer',
    ),
  });

  const webSocket = new WebSocketApi(stack, "WebSocketApi", {
    defaults: {
      function: {
        bind: [table],
        permissions: ['bedrock:InvokeModel'],
      },
    },
    routes: {
      $connect: "packages/functions/src/connect.main",
      $disconnect: "packages/functions/src/disconnect.main",
      gradeWriting: {
        function: {
          handler:"packages/functions/src/gradingWriting.main",
          timeout: "120 seconds",
        }
      },
    },
  });

  stack.addOutputs({
    WebSocketEndpoint: webSocket.url,
  });

  // Allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  return { api, apiCachePolicy, webSocket };
}
