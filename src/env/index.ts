import { env as development } from './development'
import { env as production } from './production'
import { env as test } from './test'

const getEnv = (): any => {
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

export default getEnv()
