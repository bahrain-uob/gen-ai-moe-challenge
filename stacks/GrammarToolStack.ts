import { StackContext, Service } from 'sst/constructs';
import { Fn } from 'aws-cdk-lib';

export function GrammarToolStack({ stack }: StackContext) {
  const grammarToolName = 'grammarToolDNS';
  let grammarToolDNS: string;

  if (stack.stage === 'prod') {
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

    grammarToolDNS =
      GrammerCheckerTool.cdk?.applicationLoadBalancer?.loadBalancerDnsName ??
      'undefined DNS';

    // export the DNS name of the GrammerCheckerTool to be used by other stacks
    stack.addOutputs({
      [grammarToolName]: {
        value: grammarToolDNS,
        exportName: grammarToolName,
      },
    });
  } else {
    // import the DNS name of the GrammerCheckerTool to be used by other stacks
    grammarToolDNS = Fn.importValue(grammarToolName);
    stack.addOutputs({
      GrammarTool: grammarToolDNS,
    });
  }

  return { grammarToolDNS };
}
