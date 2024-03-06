import { StackContext } from 'sst/constructs'
const fs = require('fs')
import path from 'path'

import * as imagebuilder from 'aws-cdk-lib/aws-imagebuilder';
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as iam from 'aws-cdk-lib/aws-iam'

export function ImageBuilderForCodeCatalyst({ stack, app }: StackContext) {
  const gitComponenet = new imagebuilder.CfnComponent(stack, "GitComponenet", {
    name: app.logicalPrefixedName("Git"),
    platform: "Linux",
    version: "1.0.0",
    data: fs.readFileSync(
        path.resolve('.codecatalyst/imagebuilder/git.yaml'),
        'utf8'
      )
  });

  const nodejsComponenet = new imagebuilder.CfnComponent(stack, "NodejsComponenet", {
    name: app.logicalPrefixedName("Nodejs"),
    platform: "Linux",
    version: "1.0.0",
    data: fs.readFileSync(
        path.resolve('.codecatalyst/imagebuilder/node.yaml'),
        'utf8'
      )
  });
  
  const ecrRepoForImageBuilderCodeCatalyst = new ecr.Repository(stack, "EcrRepoForImageBuilderCodeCatalyst")

  const AmazonLinux2023wGitNodeRecipe = new imagebuilder.CfnContainerRecipe(stack, "AmazonLinux2023withGitAndNodeRecipe", {
    components: [
      {
        componentArn : gitComponenet.attrArn,
      },
      {
        componentArn : nodejsComponenet.attrArn,
      }
    ],
    containerType: "DOCKER",
    dockerfileTemplateData: "FROM {{{ imagebuilder:parentImage }}}\n{{{ imagebuilder:environments }}}\n{{{ imagebuilder:components }}}\n",
    name: app.logicalPrefixedName("AmazonLinux2023WithGit"),
    parentImage: `arn:aws:imagebuilder:${stack.region}:aws:image/amazon-linux-2023-x86-latest/x.x.x`,
    targetRepository: {
      repositoryName: ecrRepoForImageBuilderCodeCatalyst.repositoryName,
      service : "ECR"
    },
    version: "2.0.0"
  })

  const instanceProfileForImageBuilder = new iam.InstanceProfile(stack, "InstanceProfileForImageBuilder", {
    role: new iam.Role(stack, 'EC2InstanceProfileForImageBuilder', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
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
  });

  const infraConfig = new imagebuilder.CfnInfrastructureConfiguration(stack, "ImageBuilderInfraConfig", {
    name: app.logicalPrefixedName("infra"),
    instanceProfileName: instanceProfileForImageBuilder.instanceProfileName,
  });
  
  const distConfig = new imagebuilder.CfnDistributionConfiguration(stack, "ImageBuilderDistConfig", {
    name: app.logicalPrefixedName("dist"),
    distributions: [
      {
        region: stack.region,
        containerDistributionConfiguration: {
          "TargetRepository" : {
            "RepositoryName" : ecrRepoForImageBuilderCodeCatalyst.repositoryName,
            "Service" : "ECR"
          }
        }
      }
    ]
  });

  const imageBuilderPipeline = new imagebuilder.CfnImagePipeline(stack, "AmazonLinux2023WithGitPipeline", {
    name: app.logicalPrefixedName("AmazonLinux23WithGitPipeline"),
    infrastructureConfigurationArn: infraConfig.attrArn,
    distributionConfigurationArn: distConfig.attrArn,
    containerRecipeArn: AmazonLinux2023wGitNodeRecipe.attrArn,
    status: "ENABLED",
  });
  
}
