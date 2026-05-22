import express from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
/**
 * Rotas de autenticação
 */
import configRouters from './api/CalcRouter'
const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'api-schema.yml'))

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
   * Health and telemetry check route
   */
  router.get('/health', (req, res) => {
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    })
  })

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
