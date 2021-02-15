import { ServiceEnum } from '../enums/Service.enum'

/**
 * Ambiente de desenvolvimento
 * @namespace
 * @name envDevelopment
 */
export const env = () => ({
  env: 'development',
  tz: process.env.TZ,
  db: process.env.DB || 'mongodb://localhost/solucimob',
  port: process.env.PORT || 3000,
  domain: process.env.DOMAIN || 'localhost:3000',
  bodyParser: {
    urlencoded: { extended: false, limit: '50mb' },
    json: { limit: '50mb' }
  },
  datetime: {
    format: {
      date: 'YYYY/MM/DD',
      datetime: 'YYYY/MM/DD hh:mm:ss'
    }
  },
  log: {
    file: 'log/server.log',
    combined: 'log/server.log',
    error: 'log/error.log'
  },
  corsOptions: {
    origin: (process.env.ORIGIN || 'http://localhost:8080').split(','), // 'http://example.com',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    exposedHeaders: 'x-auth-token'
  },
  config: {
    valorM2: process.env.CONFIG_VALOR_M2 || 1
  },
  services: {
    [ServiceEnum.calc]: { baseUrl: process.env.URL_SERVICE_CALC },
    [ServiceEnum.config]: { baseUrl: process.env.URL_SERVICE_CONFIG }
  }
})
