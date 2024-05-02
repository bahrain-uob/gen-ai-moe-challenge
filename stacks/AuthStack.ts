import { Cognito, StackContext, use } from 'sst/constructs';
import { StringAttribute } from 'aws-cdk-lib/aws-cognito';
import { DBStack } from './DBStack';


export function AuthStack({ stack, app }: StackContext) {
  const { table } = use(DBStack);
  // Create User Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
    defaults: {
      function: {
        bind: [table],
      },
    },
    triggers: {
      preSignUp: 'packages/functions/src/preSignUp.handler',
      postConfirmation : 'packages/functions/src/postConfirmation.handler', 
    },
    cdk:{
      userPool: {
        customAttributes: {
          'Institution': new StringAttribute({ mutable: true }),
        }
      }
    }
  });

  // Show user pool info in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return { auth };
}
