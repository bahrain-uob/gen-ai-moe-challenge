import { Api, StackContext, use, Service } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';

export function ApiStack({ stack }: StackContext) {
  const { table, uploads_bucket, feedback_table } = use(DBStack);

  //Create the GrammerCheckerTool Service
  const GrammerCheckerTool = new Service(stack, 'GrammerCheckerTool', {
    path: 'packages/functions/src/docker-languagetool',
    port: 8010,
    // dev: {
    //   deploy: true   //Uncomment to deploy the service while in dev mode
    // },
    cdk: {
      cloudfrontDistribution: false,
      applicationLoadBalancerTargetGroup: {
        healthCheck: {
          path: '/v2/languages',
        },
      },
    },
  });

  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
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
            grammerToolDNS: GrammerCheckerTool.cdk?.applicationLoadBalancer
              ?.loadBalancerDnsName
              ? GrammerCheckerTool.cdk?.applicationLoadBalancer
                  ?.loadBalancerDnsName
              : 'undefined DNS',
          },
        },
      },
      // Speaking getting a presigned URL to upload the response
      'GET /generate-presigned-url': {
        function: {
          handler: 'packages/functions/src/generatePresignedUrl.main',
          permissions: ['s3:PutObject'],
          environment: {
            audioResponseBucket: uploads_bucket.bucketName,
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
          timeout: '60 seconds',
        },
      },
      // Writing grading lambda function
      'POST /writing': {
        function: {
          handler: 'packages/functions/src/writing.main',
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
