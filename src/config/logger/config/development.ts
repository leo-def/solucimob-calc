import winston from 'winston'
/**
 * Configuração do objeto de log para desenvolvimento
 * @namespace
 * @name logConfigDevelopment
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
export const config = () => ({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
})
export default config
