import winston from 'winston'
import getConfig from './config'
/**
 * Função que carrega o objeto de log
 */
export const createLogger = () => {
  const config = getConfig()
  return winston.createLogger(config)
}

/**
 * Carregamento da configuração de log do sistema
 *
 * @name LoggerService
 * @module config/LoggerService
 * @category Config
 * @subcategory LoggerService
 */
export class LoggerService {
  static getLogger () {
    const logger = createLogger()
    return logger
  }
}
