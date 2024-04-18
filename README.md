# Team 11 - Frontend

The "Hack-Attack" (working title) application is a web-based game focused on educating developers on the technical aspects of cyber-security, such as DDOS Attacks or SQL Injection.

This service has been created to provide the frontend stack of the the "Hack-Attack" Web application.

The Cloudformation Stack creates an AWS S3 bucket and Cloudfront Distribution to host the application. 

The website folder contains a React application which once built is deployed into the S3 bucket, which exposes the index.html for public access.

The system also includes Admin features which allow an Admin user to log in with an AWS Cognito account. The Admin may then update, remove or add Scenarios, as well as resetting the leaderboard.

Deployed at: https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=eu-west-1#/distributions/E3KIEMFY3H08T9

## Technology Used

* Node JS - https://nodejs.org/en/
* Typescript - https://www.typescriptlang.org/
* AWS CDK - https://aws.amazon.com/cdk/
* AWS IAM - https://aws.amazon.com/iam/
* AWS S3 - https://aws.amazon.com/s3/
* Material UI - https://mui.com/
* AXIOS-HTTP - https://axios-http.com/docs/intro

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `npm install`     installs packages required to run the project

## Setup Guide

Required Steps:

* `npm install`     Installs dependencies
* `npm run build`   Builds the application
* `cdk synth`       Check that the updated stack can be synthesized into a valid Cloudformation template.
* `cdk deploy`      Deploy the application to Cloudformation

## Website Application
Inside the /website folder

## Useful commands

* `npm run build`   react build script
* `npm run test`    perform the jest unit tests
* `npm run start`   starts the react development server
* `npm install`     installs packages required to run the project

## Setup Guide

Prior to running the application you will be required to either create a .env file to store the backend url and API key:

REACT_APP_BACKEND_URL=*URL
REACT_APP_API_KEY=*KEY

*Backend URL and API Key may be found on AWS Apigateway

Alternatively in the constants it is possible to update the URL. This change is required if the backend stack has been destroyed and redeployed since the previous use. In the Gitlab CI/CD Pipeline the Backend url may be updated via the environment variables. This is then injected into the service by the build stage when the application is being deployed.

Remaining steps: 

* Run `npm install` to install dependencies
* Run `npm run build` to build the project
* Run `npm run start` to start the development server

To access the Admin section of the application click the `Admin Login` on the titlebar. This will bring you to the Admin Login screen.

Admin accounts may be created via AWS Cognito for use with the application. The current Admin account uses the email: `tcunningham12@qub.ac.uk` the password for the Admin account may be found in the Gitlab environment variables for the frontend.

The admin section gives the user these capabilities:

* Add/update a scenario using the JSON format in the Admin menu
* Delete a scenario
* Reset the leaderboard
* Get current JSON for an existing Scenario

When a Scenario is updated in the Admin screen the options on the main menu and leaderboard are dynamically updated to display this. As well as this the questions in the quiz itself will display the new changes.

## Cypress Testing
Inside the /cypress_project folder

## Useful commands

* `npm run build`       Build typescript
* `npm install`         installs packages required to run the project
* `npx cypress open`    Runs Cypress tests in a browser
* `npx cypress run`     Runs Cypress tests in headless mode

## Getting Started

Steps to follow:

* `npm install`         Installs dependencies
* `npx cypress open`    Runs Cypress tests in the browser

Once Cypress is open it will allow you to choose a browser with which to execute the tests. 

Currently we have used Cypress for E2E testing which can be selected when the browser appears.

It will then allow you to view and execute each of the test classes.

* `Leaderboard`
* `Admin Login`
* `Admin Menu`
* `Quiz Instructions`
* `Quiz`
* `Quiz Summary`
* `Main Menu`

https://www.npmjs.com/package/aws-cdk

