import { CalcRequest } from '../types/api/calc/CalcRequest'
import { CalcResponse } from '../types/api/calc/CalcResponse'
import { ConfigResponse } from '../types/api/config/ConfigResponse'
import configService from './ConfigService'
/**
 * Serviço de cálculos
 */
export class CalcService {
  // #region  API
  async calc (req: any, res: any) {
    try {
      const body = req.body ? new CalcRequest(req.body) : null
      console.log('m2', req.body.m2)
      if (!body || !body.m2) {
        throw new Error('Parâmetros inválidos')
      }

      const config: ConfigResponse = await configService.find()
      if (!config || !config.valorM2) {
        throw new Error('Valor não configurado para cálculo')
      }
      const m2 = body.m2
      const valorM2 = config.valorM2
      const valor = body.m2 * config.valorM2
      const response = new CalcResponse({
        m2,
        valor,
        valorM2
      })
      res.handleResponse(req, res, response)
    } catch (err) {
      if (err.forbiddenResponse) {
        return req.forbiddenResponse(req, res, err)
      } else {
        return req.handleError(req, res, err)
      }
    }
  }
  // #endregion  API
}

export const service = new CalcService()
export default service
