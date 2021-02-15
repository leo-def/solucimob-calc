import { ConfigResponse } from '../../types/api/config/ConfigResponse'
import getEnv from '../../env'

/**
 * Serviço de consulta de configuração
 */
export class ConfigService {
  // #region  API
  async find (): Promise<ConfigResponse> {
    const env = getEnv()
    const valorM2 = env.config ? env.config.valorM2 || 120 : 120
    return new ConfigResponse({
      valorM2
    })
  }
  // #endregion  API
}

export const service = new ConfigService()
export default service
