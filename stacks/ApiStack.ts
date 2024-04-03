import { Api, StackContext, use } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';

export function ApiStack({ stack }: StackContext) {
  const { table } = use(DBStack);

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
      // Sample Pyhton lambda function

      'GET /': 'packages/functions/src/readingQuestionRetrieverLambda.main',

      //'GET /reading/questions/{examID}': 'packages/functions/src/readingQuestionRetrieverLambda.lambda_handler',

      /*
      'POST /reading/answers': {
        function: {
          handler: 'packages/functions/src/readingGradingLambda.lambda_handler',
          runtime: 'python3.11',
          timeout: '60 seconds',
        },
        request: {
          contentType: 'application/json',
          body: {
            examID: "$input.path('$.examID')",
            questionID: "$input.path('$.questionID')",
            studentAnswer: "$input.path('$.studentAnswer')",
            score: "$input.path('$.score')"
          },
        },
        response: {
          contentType: 'application/json',
          template: `
            {
              "message": "Success",
              "examID": "$input.path('$.examID')",
              "questionID": "$input.path('$.questionID')",
              "studentAnswer": "$input.path('$.studentAnswer')",
              "score": "$input.path('$.score')"
            }
          `,
        },
      },
      */

      //'POST /reading/answers': 'packages/functions/src/gradingLambda.functionName',
      /*
      'POST /reading/answers': {
      Content-Type: application/json
      {
        "answer": ["Option A"],
        "correct_answers": ["Option A", "Option C"],
        "exam_id": "exam123"
      }
    }
*/
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
