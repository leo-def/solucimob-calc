// #region LoadFunctions
/**
 * Cria retorno com erro
 * @memberof responseHandler
 */
export const loadHandleError = (
  req: any,
  res: any,
  _next: any,
  params: any
): any => {
  const { logger } = params
  res.handleError = req.handleError = (
    _req: any,
    res: any,
    err: any,
    status = 500
  ) => {
    if (!err) {
      return false
    }
    status = err.httpStatus || status
    const responseErr = { error: true } as any
    // if(typeof err == 'string'){
    responseErr.title = err.message || err.title || err
    logger.error(err)
    logger.error(err.stack)
    logger.info(responseErr)
    if (!res.headersSent) {
      res.status(status).json(responseErr)
    }
    return true
  }
}

/**
 * Cria retorno de sucesso
 * @memberof responseHandler
 */
export const loadHandleSuccess = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.handleSuccess = req.handleSuccess = (
    _req: any,
    res: any,
    title: any,
    description: any,
    data: any = null as any,
    status: number = 200
  ) => {
    res.status(status).json({
      title: title,
      description: description,
      data: data
    })
  }
}

/**
 * Formata retorno genérico
 * @memberof responseHandler
 */
export const loadHandleResponse = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.handleResponse = req.handleResponse = (
    _req: any,
    res: any,
    data: any,
    status: number = 200
  ) => {
    res.status(status).json(data && data.toDTO ? data.toDTO() : data)
    /*
        1- JSON.stringify(object, replacer, space )
        2- res.send()
      */
  }
}

/**
 * Cria retorno com arquivo
 * @memberof responseHandler
 */
export const loadHandleFile = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.handleFile = req.handleFile = (
    _req: any,
    res: any,
    data: any,
    type = 'image/jpeg',
    status = 200
  ) => {
    res.writeHead(status, { 'Content-Type': type }) //
    res.end(data) // Send the file data to the browser.
  }
}

/**
 * Cria retorno com erro de acesso negado
 * @memberof responseHandler
 */
export const loadForbiddenResponse = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.forbiddenResponse = req.forbiddenResponse = (
    req: any,
    res: any,
    msg: any
  ) => {
    if (!msg) {
      msg = 'Authentication Failed'
    }
    req.handleError(req, res, { title: msg }, 401)
    return false
  }
}

/**
 * Confirma a autenticação,
 *   caso não exista,
 *   gera o retorno com erro
 * @memberof responseHandler
 */
export const loadConfirmAuth = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.confirmAuth = req.confirmAuth = (req: any, res: any, _next: any): any => {
    if (!req.user) {
      req.forbiddenResponse(req, res, 'Authentication Failed')
      return false
    }
    return true
  }
}

/**
 * Confirma a permissão do usuário,
 *   caso não exista,
 *   gera o retorno com erro
 * @memberof responseHandler
 */
export const loadConfirmPermission = (
  req: any,
  res: any,
  next: any,
  _params: any
): any => {
  res.confirmPermission = req.confirmPermission = (
    req: any,
    res: any,
    user: any
  ) => {
    if (!req.confirmAuth(req, res, next)) {
      return false
    }
    let userid
    userid = user._id ? user._id : user
    userid = user.id ? user.id : user
    if (userid !== req.user._id) {
      req.handleError(req, res, { title: 'Wrong Permission' }, 403)
      return false
    }
    return true
  }
}

/**
 * Confirma a existência do corpo da requisição,
 *   caso não exista,
 *   gera o retorno com erro
 * @memberof responseHandler
 */
export const loadConfirmBody = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.confirmBody = req.confirmBody = (req: any, res: any, _next: any): any => {
    if (!req.body) {
      req.handleError(req, res, { title: 'Empty body' })
      return false
    }
    return true
  }
}

/**
 * Confirma a existência de um objeto,
 *   caso não exista,
 *   gera o retorno com erro
 * @memberof responseHandler
 * @todo Separar confirmResult e confirmObjeto aonde um confirma
 *    se uma Promise tem resultado, e o outro um objeto genérico
 */

export const loadConfirmResult = (
  req: any,
  res: any,
  _next: any,
  _params: any
): any => {
  res.confirmResult = req.confirmResult = (req: any, res: any, result: any) => {
    if (!result) {
      req.handleError(req, res, { title: 'Object Not Found' }, 404)
      return false
    }
    return true
  }
}

/**
 * Valida a url da requisição,
 *   caso esteja invalida,
 *   gera o retorno com erro
 * @memberof responseHandler
 */
export const loadCheckUrl = (
  req: any,
  res: any,
  _next: any,
  params: any
): any => {
  const { env } = params

  res.checkUrl = req.checkUrl = (url: any) => {
    if (!url) {
      return false
    }
    const origins = Array.isArray(env.corsOptions.origin)
      ? env.corsOptions.origin
      : (env.corsOptions.origin || '').split(',')

    return Boolean(
      origins.find((origin: string) => origin === '*' || url.startsWith(origin))
    )
  }
}

// #endregion LoadFunctions

/**
 * Cria método para carregar as funções na requisição
 * @memberof responseHandler
 */
export const getLoadFunc = (app: any): any => {
  const load = (req: any, res: any, next: any): any => {
    const env = (req.env = res.env = app.get('env'))
    const logger = (req.logger = res.logger = app.get('logger'))
    const params = { app, env, logger }

    loadHandleError(req, res, next, params)
    loadHandleSuccess(req, res, next, params)
    loadHandleResponse(req, res, next, params)
    loadHandleFile(req, res, next, params)
    loadForbiddenResponse(req, res, next, params)
    loadConfirmAuth(req, res, next, params)
    loadConfirmPermission(req, res, next, params)
    loadConfirmBody(req, res, next, params)
    loadConfirmResult(req, res, next, params)
    loadCheckUrl(req, res, next, params)
    next()
  }
  return load
}

/**
 * Carrega funções padrões para tratamento de requisição e resposta
 *
 * @name ResponseHandler
 * @module config
 * @category Config
 * @subcategory ResponseHandler
 * @example Carregamento da classe na aplicação
 *   app.use(ResponseHandler.getLoadFunc(app));
 */
export class ResponseHandler {
  static use (app: any) {
    return app.use(getLoadFunc(app))
  }
}
