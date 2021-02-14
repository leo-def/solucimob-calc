// frameworks
import _ from 'lodash'
import { ConfigResponse } from '../../types/api/config/ConfigResponse'
import { ServiceDiscovery } from '../../commons/ServiceDiscovery'
import { ServiceEnum } from '../../enums/Service.enum'

/**
 * Serviço de consulta de configuração
 */
export class ConfigService {

  //#region  API
  async find (): Promise<ConfigResponse> {
    const client = await ServiceDiscovery.getInstance(ServiceEnum.config)
      if(!client) {
        throw new Error('Não foi possível consultar a configuração de valores')
      }
    const response = await client.get('/config/')
    return new ConfigResponse(response.data)
  }
  //#endregion  API
}

export const service = new ConfigService()
export default service
