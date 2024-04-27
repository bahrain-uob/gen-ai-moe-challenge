import { Api, StackContext, use, Service } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';

export function ApiStack({ stack }: StackContext) {
  
  const { table, questions_table, uploads_bucket, myTable } = use(DBStack);

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
          path: "/v2/languages",

        },

      },
    },
  });

  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        permissions: [uploads_bucket],
        environment: {
          audioResponseBucket: uploads_bucket.bucketName,
          TABLE1_NAME: myTable.tableName,
        },
        // Bind the table name to our API
        bind: [table, questions_table],
      },
    },
    routes: {
      // Sample TypeScript lambda function
      'POST /': 'packages/functions/src/lambda.main',
      //example for using the language tool service
      'GET /languageTool': {
        function: {
          handler: 'packages/functions/src/languageTool.main',
          environment:{
            grammerToolDNS: GrammerCheckerTool.cdk?.applicationLoadBalancer?.loadBalancerDnsName ? GrammerCheckerTool.cdk?.applicationLoadBalancer?.loadBalancerDnsName :"undefined DNS",
          }
        },
      },
      'GET /questions/{id}': 'packages/functions/src/speakingGetQuestion.main',
      'GET /generate-presigned-url':
        'packages/functions/src/generatePresignedUrl.main',
      // Writing grading lambda function
      'POST /writing': {
        function: {
          handler: 'packages/functions/src/writing.main',
          permissions: ['bedrock:InvokeModel'],
          timeout: '60 seconds',
        },
      }, //testing bedrock api for writing
      //api endpoint for retrieving reading questions
      'GET /{section}/{sk}': 'packages/functions/src/getQuestionsReadingListening.handler',
      'POST /answers/{section}/{sk}': 'packages/functions/src/GradingReadingListening.handler',

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

  return { api, apiCachePolicy };
}
