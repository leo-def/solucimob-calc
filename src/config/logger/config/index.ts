import { config as development } from './development'
import { config as production } from './production'
import { config as test } from './test'

export const getConfig = (): any => {
  switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
      return production
    case 'test':
      return test
    default:
      return development
  }
}

export default getConfig()
