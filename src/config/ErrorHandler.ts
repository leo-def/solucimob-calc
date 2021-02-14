// #region LoadFunctions

import { AuthError } from "../errors/AuthError"

/**
 * Cria retorno com erro
 * @memberof ErrorHandler
 */
export const errorHandlerFunc = (err, req, res, next) => {
    if (err) {
      if (err instanceof AuthError || err.forbiddenResponse) {
        req.forbiddenResponse(req, res, err)
      } else {
        req.handleError(req, res, err)
      }
    }
}

// #endregion LoadFunctions

/**
 * Carrega funções padrões para tratamento de requisição e resposta
 *
 * @name ErrorHandler
 * @module config
 * @category Config
 * @subcategory ErrorHandler
 * @example Carregamento da classe na aplicação
 *   app.use(ErrorHandler.getLoadFunc(app));
 */
export class ErrorHandler {
  static use (app) {
    app.use(errorHandlerFunc)
  }
}
