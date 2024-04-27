import { Api, StackContext, use } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';

export function ApiStack({ stack }: StackContext) {
  const { table, questions_table, uploads_bucket } = use(DBStack);

  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        permissions: [uploads_bucket],
        environment: {
          audioResponseBucket: uploads_bucket.bucketName,
        },
        // Bind the table name to our API
        bind: [table, questions_table],
      },
    },
    routes: {
      // Sample TypeScript lambda function
      'POST /': 'packages/functions/src/lambda.main',
      'GET /questions/{id}': 'packages/functions/src/speakingGetQuestion.main',
      'GET /generate-presigned-url':
        'packages/functions/src/generatePresignedUrl.main',
      // Writing Task 1 grading lambda function
      'POST /grade-writing-task1': {
        function: {
          handler: 'packages/functions/src/gradingWritingTask1.main',
          permissions: ['bedrock:InvokeModel'],
          timeout: '120 seconds',
        },
      },
      // Writing Task 2 grading lambda function
      'POST /grade-writing-task2': {
        function: {
          handler: 'packages/functions/src/gradingWritingTask2.main',
          permissions: ['bedrock:InvokeModel'],
          timeout: '60 seconds',
        },
      },
      // Sample Pyhton lambda function
      'GET /': {
        function: {
          handler: 'packages/functions/src/sample-python-lambda/lambda.main',
          runtime: 'python3.11',
          timeout: '60 seconds',
        },
      },
    },
  });

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

  return { api, apiCachePolicy };
}
