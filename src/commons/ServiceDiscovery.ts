import { ServiceEnum } from '../enums/Service.enum'
import getEnv from '../env'
import { ApiClient } from './ApiClient'

export class ServiceDiscovery {
  static async getInstance (key: ServiceEnum) {
    const env = getEnv()
    const services = env.services || {}
    const service = services[key]
    if (!service) {
      return null
    }
    return ApiClient.getClient({
      baseURL: service.baseUrl
    })
  }
}
