import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: 'eu-west-1_De80gRiHw',
  ClientId: '4maduil2hgi8j77lc9bc19k4d6',
}

export default new CognitoUserPool(poolData)
