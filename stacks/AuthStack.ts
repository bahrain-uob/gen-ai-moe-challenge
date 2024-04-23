import { Cognito, StackContext } from 'sst/constructs';

export function AuthStack({ stack, app }: StackContext) {
  // Create User Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
  });

  // Show user pool info in the output
  stack.addOutputs({
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return { auth };
}
