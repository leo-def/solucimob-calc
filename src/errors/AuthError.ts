/**
 * Erro relacionado a autenticação
 *
 * @name AuthError
 * @module errors
 * @category Errors
 * @subcategory errors
 */
export class AuthError extends Error {
  public readonly httpStatus = 403
  public readonly forbiddenResponse = true
}
