import { DTO } from "../../../abstracts/DTO";

/**
 * Requisição da consulta da calculo
 * @typedef {Object} CalcRequest
 * @property {String} m2 Nr. de metros quadrados.
 */
export class CalcRequest extends DTO {
  m2: number;

  constructor(defaultValues?: any) {
    super();
    if (defaultValues) {
      this.load(defaultValues, this);
    }
  }

  toDTO() {
    const { m2 } = this;
    return {
      m2,
    };
  }
}
