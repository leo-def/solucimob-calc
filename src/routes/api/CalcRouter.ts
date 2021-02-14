import express from 'express'
import service from '../../services/CalcService'


/**
 * Mapeamento de rotas para autenticação
 * @namespace
 * @name calcRoutes
 *
 * @example Rota para consulta de calcuração
 *     router.get('/', service.getcalc.bind(service))
 *
 */
export const calcRoutes = () => {
  const router = express.Router()

  /**
   * Rota para calcuração no sistema
   * @memberof calcRoutes
   */
  router.post('/', service.calc.bind(service))

  return router
}

export default calcRoutes
