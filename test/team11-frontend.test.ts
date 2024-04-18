import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Team11Frontend from '../lib/team11-frontend-stack';

test('SQS Queue and SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Team11Frontend.Team11FrontendStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);
});
