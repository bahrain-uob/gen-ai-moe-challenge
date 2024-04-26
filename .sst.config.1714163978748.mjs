import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// stacks/FrontendStack.ts
import { Fn } from "aws-cdk-lib";
import {
  AllowedMethods,
  OriginProtocolPolicy,
  OriginSslPolicy,
  ViewerProtocolPolicy
} from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { StaticSite, use as use2 } from "sst/constructs";

// stacks/ApiStack.ts
import { Api, use } from "sst/constructs";

// stacks/DBStack.ts
import { Bucket, Table } from "sst/constructs";
function DBStack({ stack, app }) {
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string"
    },
    primaryIndex: { partitionKey: "counter" }
  });
  const uploads_bucket = new Bucket(stack, "Uploads");
  const transcription_bucket = new Bucket(stack, "Transcripts");
  const questions_table = new Table(stack, "Questions", {
    fields: {
      questionId: "string"
    },
    primaryIndex: { partitionKey: "questionId" }
  });
  const feedback_table = new Table(stack, "ResponseFeedback", {
    fields: {
      feedbackId: "string"
    },
    primaryIndex: { partitionKey: "feedbackId" }
  });
  uploads_bucket.addNotifications(stack, {
    fileUpload: {
      function: {
        handler: "packages/functions/src/transcribe.main",
        environment: { outBucket: transcription_bucket.bucketName }
      },
      events: ["object_created"],
      filters: [{ suffix: ".mp3" }]
    }
  });
  uploads_bucket.attachPermissions([
    "s3:PutObject",
    "s3:GetObject",
    "transcribe:StartTranscriptionJob"
  ]);
  transcription_bucket.addNotifications(stack, {
    fileUpload: {
      function: {
        handler: "packages/functions/src/feedback.main",
        environment: {
          uploadBucketName: uploads_bucket.bucketName,
          FeedbackTableName: feedback_table.tableName
        }
      },
      events: ["object_created"],
      filters: [{ suffix: ".json" }]
    }
  });
  transcription_bucket.attachPermissions([
    "s3:GetObject",
    "bedrock:InvokeModel",
    "dynamodb:PutItem"
  ]);
  const mainDBLogicalName = "MainDatabase";
  const dbSecretArnOutputName = "DBSecretArn";
  const dbClusterIdentifierOutputName = "DBClusterIdentifier";
  var db;
  return {
    table,
    uploads_bucket,
    transcription_bucket,
    questions_table,
    feedback_table
  };
}
__name(DBStack, "DBStack");

// stacks/ApiStack.ts
import { CacheHeaderBehavior, CachePolicy } from "aws-cdk-lib/aws-cloudfront";
import { Duration } from "aws-cdk-lib/core";
function ApiStack({ stack }) {
  const { table, questions_table, uploads_bucket } = use(DBStack);
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [uploads_bucket],
        environment: {
          audioResponseBucket: uploads_bucket.bucketName
        },
        // Bind the table name to our API
        bind: [table, questions_table]
      }
    },
    routes: {
      // Sample TypeScript lambda function
      "POST /": "packages/functions/src/lambda.main",
      "GET /questions/{id}": "packages/functions/src/speakingGetQuestion.main",
      "GET /generate-presigned-url": "packages/functions/src/generatePresignedUrl.main",
      // Writing grading lambda function
      "POST /writing": {
        function: {
          handler: "packages/functions/src/writing.main",
          permissions: ["bedrock:InvokeModel"],
          timeout: "60 seconds"
        }
      },
      // Sample Pyhton lambda function
      "GET /": {
        function: {
          handler: "packages/functions/src/sample-python-lambda/Polly.main",
          runtime: "python3.11",
          permissions: ["polly:SynthesizeSpeech"],
          timeout: "60 seconds"
        }
      }
    }
  });
  const apiCachePolicy = new CachePolicy(stack, "CachePolicy", {
    minTtl: Duration.seconds(0),
    // no cache by default unless backend decides otherwise
    defaultTtl: Duration.seconds(0),
    headerBehavior: CacheHeaderBehavior.allowList(
      "Accept",
      "Authorization",
      "Content-Type",
      "Referer"
    )
  });
  return { api, apiCachePolicy };
}
__name(ApiStack, "ApiStack");

// stacks/FrontendStack.ts
function FrontendStack({ stack }) {
  const { api, apiCachePolicy } = use2(ApiStack);
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url
    },
    cdk: {
      distribution: {
        additionalBehaviors: {
          "/api/*": {
            origin: new HttpOrigin(Fn.parseDomainName(api.url), {
              originSslProtocols: [OriginSslPolicy.TLS_V1_2],
              protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY
            }),
            viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
            cachePolicy: {
              cachePolicyId: apiCachePolicy.cachePolicyId
            },
            allowedMethods: AllowedMethods.ALLOW_ALL,
            cachedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS
          }
        }
      }
    }
  });
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url
  });
}
__name(FrontendStack, "FrontendStack");

// stacks/devops/ImageBuilderForCodeCatalyst.ts
import path from "path";
import * as imagebuilder from "aws-cdk-lib/aws-imagebuilder";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as iam from "aws-cdk-lib/aws-iam";
var fs = __require("fs");
function ImageBuilderForCodeCatalyst({ stack, app }) {
  const gitComponenet = new imagebuilder.CfnComponent(stack, "GitComponenet", {
    name: app.logicalPrefixedName("Git"),
    platform: "Linux",
    version: "1.0.0",
    data: fs.readFileSync(
      path.resolve(".codecatalyst/imagebuilder/git.yaml"),
      "utf8"
    )
  });
  const nodejsComponenet = new imagebuilder.CfnComponent(
    stack,
    "NodejsComponenet",
    {
      name: app.logicalPrefixedName("Nodejs"),
      platform: "Linux",
      version: "1.0.0",
      data: fs.readFileSync(
        path.resolve(".codecatalyst/imagebuilder/node.yaml"),
        "utf8"
      )
    }
  );
  const ecrRepoForImageBuilderCodeCatalyst = new ecr.Repository(
    stack,
    "EcrRepoForImageBuilderCodeCatalyst"
  );
  const AmazonLinux2023wGitNodeRecipe = new imagebuilder.CfnContainerRecipe(
    stack,
    "AmazonLinux2023withGitAndNodeRecipe",
    {
      components: [
        {
          componentArn: gitComponenet.attrArn
        },
        {
          componentArn: nodejsComponenet.attrArn
        }
      ],
      containerType: "DOCKER",
      dockerfileTemplateData: "FROM {{{ imagebuilder:parentImage }}}\n{{{ imagebuilder:environments }}}\n{{{ imagebuilder:components }}}\n",
      name: app.logicalPrefixedName("AmazonLinux2023WithGit"),
      parentImage: `arn:aws:imagebuilder:${stack.region}:aws:image/amazon-linux-2023-x86-latest/x.x.x`,
      targetRepository: {
        repositoryName: ecrRepoForImageBuilderCodeCatalyst.repositoryName,
        service: "ECR"
      },
      version: "2.0.0"
    }
  );
  const instanceProfileForImageBuilder = new iam.InstanceProfile(
    stack,
    "InstanceProfileForImageBuilder",
    {
      role: new iam.Role(stack, "EC2InstanceProfileForImageBuilder", {
        assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
        managedPolicies: [
          {
            managedPolicyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
          },
          {
            managedPolicyArn: "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilder"
          },
          {
            managedPolicyArn: "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilderECRContainerBuilds"
          }
        ]
      })
    }
  );
  const infraConfig = new imagebuilder.CfnInfrastructureConfiguration(
    stack,
    "ImageBuilderInfraConfig",
    {
      name: app.logicalPrefixedName("infra"),
      instanceProfileName: instanceProfileForImageBuilder.instanceProfileName
    }
  );
  const distConfig = new imagebuilder.CfnDistributionConfiguration(
    stack,
    "ImageBuilderDistConfig",
    {
      name: app.logicalPrefixedName("dist"),
      distributions: [
        {
          region: stack.region,
          containerDistributionConfiguration: {
            TargetRepository: {
              RepositoryName: ecrRepoForImageBuilderCodeCatalyst.repositoryName,
              Service: "ECR"
            }
          }
        }
      ]
    }
  );
  const imageBuilderPipeline = new imagebuilder.CfnImagePipeline(
    stack,
    "AmazonLinux2023WithGitPipeline",
    {
      name: app.logicalPrefixedName("AmazonLinux23WithGitPipeline"),
      infrastructureConfigurationArn: infraConfig.attrArn,
      distributionConfigurationArn: distConfig.attrArn,
      containerRecipeArn: AmazonLinux2023wGitNodeRecipe.attrArn,
      status: "ENABLED"
    }
  );
}
__name(ImageBuilderForCodeCatalyst, "ImageBuilderForCodeCatalyst");

// stacks/devops/OIDCForGitHubCI.ts
import { Duration as Duration2 } from "aws-cdk-lib";
import * as iam2 from "aws-cdk-lib/aws-iam";
function OIDCForGitHubCI({ stack }) {
  const provider = new iam2.OpenIdConnectProvider(stack, "GitHub", {
    url: "https://token.actions.githubusercontent.com",
    clientIds: ["sts.amazonaws.com"]
  });
  const organization = "bahrain-uob";
  const repository = "gen-ai-moe-challenge";
  new iam2.Role(stack, "GitHubActionsRole", {
    assumedBy: new iam2.OpenIdConnectPrincipal(provider).withConditions({
      StringLike: {
        "token.actions.githubusercontent.com:sub": `repo:${organization}/${repository}:*`
      }
    }),
    description: "Role assumed for deploying from GitHub CI using AWS CDK",
    roleName: "GitHub",
    // Change this to match the role name in the GitHub workflow file
    maxSessionDuration: Duration2.hours(1),
    inlinePolicies: {
      // You could attach AdministratorAccess here or constrain it even more, but this uses more granular permissions used by SST
      SSTDeploymentPolicy: new iam2.PolicyDocument({
        assignSids: true,
        statements: [
          new iam2.PolicyStatement({
            effect: iam2.Effect.ALLOW,
            actions: [
              "cloudformation:DeleteStack",
              "cloudformation:DescribeStackEvents",
              "cloudformation:DescribeStackResources",
              "cloudformation:DescribeStacks",
              "cloudformation:GetTemplate",
              "cloudformation:ListImports",
              "ecr:CreateRepository",
              "iam:PassRole",
              "iot:Connect",
              "iot:DescribeEndpoint",
              "iot:Publish",
              "iot:Receive",
              "iot:Subscribe",
              "lambda:GetFunction",
              "lambda:GetFunctionConfiguration",
              "lambda:UpdateFunctionConfiguration",
              "s3:ListBucket",
              "s3:PutObjectAcl",
              "s3:GetObject",
              "s3:PutObject",
              "s3:DeleteObject",
              "s3:ListObjectsV2",
              "s3:CreateBucket",
              "s3:PutBucketPolicy",
              "ssm:DeleteParameter",
              "ssm:GetParameter",
              "ssm:GetParameters",
              "ssm:GetParametersByPath",
              "ssm:PutParameter",
              "sts:AssumeRole"
            ],
            resources: ["*"]
          })
        ]
      })
    }
  });
}
__name(OIDCForGitHubCI, "OIDCForGitHubCI");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "codecatalyst-sst-app",
      region: "us-east-1"
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    if (app.stage == "devops-coca") {
      app.stack(ImageBuilderForCodeCatalyst);
    } else if (app.stage == "devops-gh") {
      app.stack(OIDCForGitHubCI);
    } else {
      app.stack(DBStack).stack(ApiStack).stack(FrontendStack);
    }
  }
};
export {
  sst_config_default as default
};
