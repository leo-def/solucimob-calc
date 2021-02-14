import winston from 'winston'
import getEnv from '../../../env'

/**
 * Configuração do objeto de log para produção
 * @namespace
 * @name logConfigProduction
 * @example
 *     const files =  new winston.transports.File({ filename:  env.log.combined}),
 *     const console = new winston.transports.Console()
 *     logger
 *         .clear()
 *         .add(console)
 *         .add(files)
 *         .remove(console);
 *
 */
export const config = () => {
  const env = getEnv()
  return {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console({
        handleExceptions: true
      }),
      new winston.transports.File({
        filename: env.log.combined,
        handleExceptions: true
      }),
      new winston.transports.File({
        filename: env.log.error,
        handleExceptions: true
      })
    ],
    exitOnError: false
  }
}
export default config
