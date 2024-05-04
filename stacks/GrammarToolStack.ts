import { StackContext, Service } from 'sst/constructs';

export function GrammarToolStack({ stack }: StackContext) {
  // Create the GrammerCheckerTool Service
  const GrammerCheckerTool = new Service(stack, 'GrammerCheckerTool', {
    path: 'packages/functions/src/docker-languagetool',
    port: 8010,
    dev: {
      deploy: true, //Uncomment to deploy the service while in dev mode
    },
    cdk: {
      cloudfrontDistribution: false,
      applicationLoadBalancerTargetGroup: {
        healthCheck: {
          path: '/v2/languages',
        },
      },
    },
  });
  const grammerToolDNS =
    GrammerCheckerTool.cdk?.applicationLoadBalancer?.loadBalancerDnsName ??
    'undefined DNS';

  return { GrammerCheckerTool, grammerToolDNS };
}
