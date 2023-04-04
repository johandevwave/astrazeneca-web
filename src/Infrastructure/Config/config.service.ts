import { IConfiguration } from './config.type'

class ConfigService {
  private configuration: IConfiguration

  constructor() {
    const runtimeConfiguration = (window as any).APP_CONFIGURATION
    const compiletimeConfiguration: IConfiguration = {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL || '',
      NODE_ENV: process.env.NODE_ENV,
      access_token: '',
    }

    this.configuration = this.isValidRunTimeConfig(runtimeConfiguration)
      ? runtimeConfiguration
      : compiletimeConfiguration
  }

  set compiletimeConfiguration(configuration: Partial<IConfiguration>) {
    this.configuration = {
      ...this.configuration,
      ...configuration,
    }
  }

  get config(): IConfiguration {
    return {
      ...this.configuration,
    }
  }

  private isValidRunTimeConfig = (c: IConfiguration) => c && c.REACT_APP_API_URL
}

export default new ConfigService()
