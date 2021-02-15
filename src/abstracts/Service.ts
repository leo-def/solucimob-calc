const auth = (_req: any, _res: any, _next: any, _service: any) => {
  return true
}

/**
 * Serviço padrão para as operações de CRUD de um documento
 * com a proteção padrão para serviços
 *
 * @name Service
 * @module abstracts/service/modulo
 * @category Abstrato
 * @subcategory Serviço
 */
export class Service {
  auth (req: any, res: any, next: any): any {
    return auth(req, res, next, this)
  }
}
