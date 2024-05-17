import { Fn } from 'aws-cdk-lib';
import {
  AllowedMethods,
  OriginProtocolPolicy,
  OriginSslPolicy,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';

import { StaticSite, StackContext, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';

export function FrontendStack({ stack, app }: StackContext) {
  const { api, apiCachePolicy, webSocket } = use(ApiStack);
  const { auth } = use(AuthStack);

  // Deploy our React app
  const site = new StaticSite(stack, 'ReactSite', {
    path: 'packages/frontend',
    buildCommand: 'npm run build',
    buildOutput: 'dist',
    environment: {
      VITE_API_URL: api.url,
      VITE_APP_REGION: app.region,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_WEBSOCKET_URL: webSocket.url,
    },
    cdk: {
      distribution: {
        additionalBehaviors: {
          '/api/*': {
            origin: new HttpOrigin(Fn.parseDomainName(api.url), {
              originSslProtocols: [OriginSslPolicy.TLS_V1_2],
              protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY,
            }),
            viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
            cachePolicy: {
              cachePolicyId: apiCachePolicy.cachePolicyId,
            },
            allowedMethods: AllowedMethods.ALLOW_ALL,
            cachedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          },
        },
      },
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
