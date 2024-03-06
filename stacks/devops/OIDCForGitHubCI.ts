import { Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { StackContext } from 'sst/constructs';

export function OIDCForGitHubCI({stack }: StackContext) {

    const provider = new iam.OpenIdConnectProvider(stack, 'GitHub', {
    url: 'https://token.actions.githubusercontent.com',
    clientIds: ['sts.amazonaws.com'],
    });

    const organization = 'INSERT_GITHUB_USER_OR_ORG'; // Use your GitHub organization
    const repository = 'INSERT_GITHUB_REPO_NAME'; // Use your GitHub repository

    new iam.Role(stack, 'GitHubActionsRole', {
    assumedBy: new iam.OpenIdConnectPrincipal(provider).withConditions({
        StringLike: {
        'token.actions.githubusercontent.com:sub': `repo:${organization}/${repository}:*`,
        },
    }),
    description: 'Role assumed for deploying from GitHub CI using AWS CDK',
    roleName: 'GitHub', // Change this to match the role name in the GitHub workflow file
    maxSessionDuration: Duration.hours(1),
    inlinePolicies: { // You could attach AdministratorAccess here or constrain it even more, but this uses more granular permissions used by SST
        SSTDeploymentPolicy: new iam.PolicyDocument({
        assignSids: true,
        statements: [
            new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'cloudformation:DeleteStack',
                'cloudformation:DescribeStackEvents',
                'cloudformation:DescribeStackResources',
                'cloudformation:DescribeStacks',
                'cloudformation:GetTemplate',
                'cloudformation:ListImports',
                'ecr:CreateRepository',
                'iam:PassRole',
                'iot:Connect',
                'iot:DescribeEndpoint',
                'iot:Publish',
                'iot:Receive',
                'iot:Subscribe',
                'lambda:GetFunction',
                'lambda:GetFunctionConfiguration',
                'lambda:UpdateFunctionConfiguration',
                's3:ListBucket',
                's3:PutObjectAcl',
                's3:GetObject',
                's3:PutObject',
                's3:DeleteObject',
                's3:ListObjectsV2',
                's3:CreateBucket',
                's3:PutBucketPolicy',
                'ssm:DeleteParameter',
                'ssm:GetParameter',
                'ssm:GetParameters',
                'ssm:GetParametersByPath',
                'ssm:PutParameter',
                'sts:AssumeRole',
            ],
            resources: [
                '*',
            ],
            }),
        ],
        }),
    },
    });

}    