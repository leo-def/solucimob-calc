import express from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load( path.resolve(process.cwd(), 'api-schema.yml'))
/**
 * Rotas de autenticação
 */
import configRouters from './api/CalcRouter'

/**
 * Mapeamento de rotas do sistema
 * @namespace
 * @name routes
 */
export const routes = () => {
  const router = express.Router({ mergeParams: true })


  router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  )

  /**
   * Mapeamento de rotas de configuração
   * @memberof apiRoutes
   */
  router.use(
    '/calc',
    configRouters()
  )


  return router
}
export default routes
