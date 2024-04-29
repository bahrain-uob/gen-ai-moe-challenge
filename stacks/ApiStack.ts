import { Api, StackContext, use, Service } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';
import { AuthStack } from './AuthStack';

export function ApiStack({ stack }: StackContext) {
  const { table, questions_table, uploads_bucket } = use(DBStack);
  const { auth } = use(AuthStack);

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
      authorizer: 'jwt',
      function: {
        permissions: [uploads_bucket],
        environment: {
          audioResponseBucket: uploads_bucket.bucketName,
        },
        // Bind the table name to our API
        bind: [table, questions_table],
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
      "GET    /question/{questionType}": "packages/functions/src/question.main",
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
      },
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

  // Allowing authenticated users to access API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  return { api, apiCachePolicy };
}
