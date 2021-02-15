import { DTO } from '../../../abstracts/DTO'

/**
 * Retorno da consulta da configuração
 * @typedef {Object} CalcResponse
 * @property {String} m2 Nr. de metros quadrados.
 * @property {String} valorM2 Valor do metro quadrado.
 * @property {String} valor Valor total de todos metros quadrados.
 */
export class CalcResponse extends DTO {
  m2: number;
  valor: number;
  valorM2: number;

  constructor (defaultValues?: any) {
    super()
    if (defaultValues) {
      this.load(defaultValues, this)
    }
  }

  toDTO () {
    const { m2, valor, valorM2 } = this
    return {
      m2,
      valor,
      valorM2
    }
  }
}
