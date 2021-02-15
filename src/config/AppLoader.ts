import express, { Application } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import YAML from 'yamljs'
import { OpenApiValidator } from 'express-openapi-validate'
import getEnv from '../env'
import routes from '../routes/Router'
import { ResponseHandler } from './ResponseHandler'
import { LoggerService } from './logger/LoggerService'
import { ErrorHandler } from './ErrorHandler'
const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'api-schema.yml'))

/**
 * Carrega a configuração principal da aplicação retornando uma
 *   encadeamento de funções a serem executadas no fluxo principal
 *   do sistema
 * @namespace
 */
export const loadApp = async () => {
  const env = getEnv()
  const logger = LoggerService.getLogger()

  /**
   * Cria objeto principal da aplicação para carregar
   *   a configuração e encadeamento de funções
   *
   * @memberof loadApp
   *
   * @example Estratégia da aplicação (Usar)
   *    const app = express();
   *
   * @example Estratégia com uso de web-sockets
   *    const appExpressWs = expressWs(app);
   *
   */
  const app: Application = express()

  /**
   * Carrega as principais variáveis globais da aplicação
   *   public - Local de arquivos públicos para acesso da api
   *   title  - Titulo da aplicação
   *   env    - Configuração do ambiente da aplicação
   *   db     - Configuração da base de dados
   *   logger - Função para salvar logs da aplicação
   *   modelFactory - Função de gerênciamento de objetos de persistência
   *
   * @memberof loadApp
   *
   */
  app.use('public', express.static(path.join(__dirname, 'public/')))
  app.set('title', 'Tracker')
  app.set('env', env)
  app.set('logger', logger)

  /**
   * Configuração para lidar com ataques do tipo CORS
   *   (Compartilhamento de recursos de origem cruzada))
   *
   * @memberof loadApp
   *
   * @example Utilizando a configuração de ambiente (Usar)
   *   app.use(cors(env.corsOptions));
   *
   * @example Configuração manual
   *   app.options('', (req: any, res: any, next: any) => {
   *   var headers = {};
   *   headers['Access-Control-Allow-Origin'] = '';
   *   headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
   *   headers['Access-Control-Allow-Credentials'] = false;
   *   headers['Access-Control-Max-Age'] = '86400'; // 24 hours
   *   headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, cache-control';
   *   res.writeHead(200, headers);
   *   res.end();
   *   });
   *
   */
  app.use(cors(env.corsOptions))

  /**
   * Estratégia de automatização dos logs da comunicação HTTP
   * @memberof loadApp
   * @example
   *   app.use(morgan('tiny', { stream: logger.stream }))
   */
  app.use(morgan('common'))

  /**
   * Define estratégia de conversão de requisição
   *    para objeto valido para o sistema
   *    - Conversão os parâmetros de URL
   *    - Conversão do corpo da requisição no formato JSON
   *    - Método antigo utilizado para definir um método HTTP
   * @memberof loadApp
   *
   */
  app.use(bodyParser.urlencoded(env.bodyParser.urlencoded))
  app.use(bodyParser.json(env.bodyParser.json))
  app.use(methodOverride())

  /**
   * Carrega funções comuns no app para serem usadas
   *   pela aplicação
   *
   * @memberof loadApp
   *
   */
  ResponseHandler.use(app)

  /**
   * Realiza o parser do header de cookies da requisição
   *   populando req.cookies e armazena o ID da sessão
   *
   * @memberof loadApp
   *
   */
  app.use(cookieParser())

  /**
   * Proteção da aplicação usando a lib helmet
   *   frameguard - impede que a pagina seja acessada por xframes
   *   noSniff - impede que o browser use scripts ou links
   *      com arquivos que não sejam css ou js
   *
   * @memberof loadApp
   *
   * @example
   *   app.disable('x-powerd-by');
   */
  app.use(helmet.ieNoOpen())
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())

  /**
   * Configuração do retorno em JSON
   *
   * @memberof loadApp
   *
   * @example
   *  app.set('json replacer', date.replacer.bind(date));
   *  app.set('json spaces', 2);
   */
  app.set('json spaces', 2)

  /**
   * Configuração da documentação da api
   * @memberof loadApp
   */
  const validator = new OpenApiValidator(swaggerDocument)
  app.use(validator.match())

  /**
   * Roteamento da requisição para os serviços
   *   pela aplicação
   *
   * @memberof loadApp
   *
   */
  app.use(routes())

  /**
   * Tratamento padrão de erros
   *
   * @memberof loadApp
   *
   */
  ErrorHandler.use(app)

  return app
}

export class AppLoader {
  static load () {
    return loadApp()
  }
}
