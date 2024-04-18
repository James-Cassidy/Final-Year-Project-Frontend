import { NON_PRODUCTION_ENVIRONMENT, PRODUCTION_ENVIRONMENT } from './constants.cy'

class Environment {
  environmentName: string
  databaseName: string
  frontendURL: string

  constructor(env: string) {
    if (env === 'non-prod') {
      this.environmentName = NON_PRODUCTION_ENVIRONMENT.environmentName
      this.frontendURL = NON_PRODUCTION_ENVIRONMENT.urlFrontend
    }
    if (env === 'prod') {
      this.environmentName = PRODUCTION_ENVIRONMENT.environmentName
      this.frontendURL = PRODUCTION_ENVIRONMENT.urlFrontend
    }
  }
}

const environment = new Environment(process.env.ENVIRONMENT || 'non-prod')

export default environment
