// export * from './Mock';
import configService, { ConfigService as MainConfigService } from './ConfigService';
import  mock, { ConfigService as MockConfigService } from './Mock';
import getEnv from '../../env'

const env = getEnv()
const getInstance = () => env.env === 'test' ? mock : configService
const getClass = () => env.env === 'test' ? MockConfigService : MainConfigService
export const ConfigService = getClass()
export default getInstance()