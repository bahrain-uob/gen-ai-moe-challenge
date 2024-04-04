import { Api, StackContext, use } from 'sst/constructs';
import { DBStack } from './DBStack';
import { CacheHeaderBehavior, CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib/core';

export function ApiStack({ stack }: StackContext) {
  const { readingExamsTable } = use(DBStack);
  // Create the HTTP API
  const api = new Api(stack, "readingApi", {
      defaults: {
        function: {
          environment: {
            TABLE_NAME: readingExamsTable.tableName,
          },
        },
      },
     
      routes: {
        "GET /reading/questions": "./packages/functions/src/readingfromdb.handler",
        "POST /reading/questions": "./packages/functions/src/creatingtest.handler",
      },
    });
     
    api.attachPermissions([readingExamsTable]);
     
   
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
