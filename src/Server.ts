import http from 'http'
import * as dotenv from 'dotenv'
import moment from 'moment-timezone'
import { AppLoader } from './config/AppLoader'
import { LoggerService } from './config/logger/LoggerService'

/**
 * Carrega o arquivo .env nas variáveis de ambiente
 */
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.config()
}


/**
 * Carrega timezone
 */
moment.tz.setDefault(process.env.TZ)

/**
 * Importa as configurações do ambiente de acordo com o perfil
 */
const logger = LoggerService.getLogger()

/**
 * Classe principal do servidor, contem toda configuração e regra de negócios do servidor
 * @alias Server
 * @typedef {object} Server
 */
const server = AppLoader.load().then((app) => {
  const env = app.get('env')
  /**
   * Inicializa o servidor HTTP
   */
  return http.createServer(app).listen(
    env.port, // port
    // hostname
    () => {
      // callback
      logger.info(`BACKEND is running on 
        Port: ${env.port} 
        Node ENV: ${env.NODE_ENV} 
        Version: ${JSON.stringify(process.versions)}.`)
    }
  )
})

export default server
