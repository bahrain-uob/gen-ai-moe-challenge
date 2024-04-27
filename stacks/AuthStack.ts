import { Cognito, StackContext } from 'sst/constructs';
import { StringAttribute } from 'aws-cdk-lib/aws-cognito';

export function AuthStack({ stack, app }: StackContext) {
  // Create User Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
    triggers: {
      preSignUp: 'packages/functions/src/preSignUp.handler',
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
