#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { Team11FrontendStack } from '../lib/team11-frontend-stack'
import environment from '../lib/config/environment'

const app = new cdk.App()
new Team11FrontendStack(
  app,
  `team11-${environment.environmentName}-frontend-stack`,
  {
    env: {
      account: '394261647652',
      region: 'eu-west-1',
    },
  }
)
