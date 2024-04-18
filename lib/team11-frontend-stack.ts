import {
  Stack,
  StackProps,
  aws_s3,
  RemovalPolicy,
  aws_s3_deployment,
  aws_iam,
  aws_cloudfront,
  aws_cloudfront_origins,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'
import environment from './config/environment'
import path = require('path')

export class Team11FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const frontEndBucket = new aws_s3.Bucket(
      this,
      `team11-${environment.environmentName}-s3-bucket`,
      {
        removalPolicy: RemovalPolicy.DESTROY,
        cors: [
          {
            allowedMethods: [
              aws_s3.HttpMethods.GET,
              aws_s3.HttpMethods.PUT,
              aws_s3.HttpMethods.POST,
              aws_s3.HttpMethods.DELETE,
            ],
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
          },
        ],
      }
    )

    const accessPolicy = new aws_iam.PolicyStatement({
      sid: 'PublicRead',
      effect: aws_iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [new aws_iam.AnyPrincipal()],
      resources: [
        `${frontEndBucket.bucketArn}/*,${frontEndBucket.arnForObjects('*')}`,
      ],
    })

    const dist = new aws_cloudfront.Distribution(
      this,
      `team11-${environment.environmentName}-cloudfront-distribution`,
      {
        defaultBehavior: {
          origin: new aws_cloudfront_origins.S3Origin(frontEndBucket),
          viewerProtocolPolicy:
            aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: aws_cloudfront.AllowedMethods.ALLOW_ALL,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 403,
            responsePagePath: '/index.html',
          },
        ],
      }
    )

    const deployment = new aws_s3_deployment.BucketDeployment(
      this,
      `team11-${environment.environmentName}-s3-deployment`,
      {
        sources: [aws_s3_deployment.Source.asset(`website/build`)],
        destinationBucket: frontEndBucket,
        distribution: dist,
      }
    )
  }
}
