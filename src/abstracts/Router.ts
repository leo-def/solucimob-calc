
/**
 * Roteamento padrão para as operações de CRUD de um documento
 * com a proteção padrão para rota
 *
 * @name Router
 * @module abstracts/router/modulo
 * @category Abstrato
 * @subcategory Roteamento
 */
export class Router {
  getAuthTask (): any {
    return () => true
  }
}
