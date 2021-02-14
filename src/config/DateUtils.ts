import moment from 'moment'

/**
 * Funções para manipular datas de acordo com configuração do app
 *
 * @name Auth
 * @module config/auth
 * @category Config
 * @subcategory Date
 */
export class DateUtils {
  /**
   * Formato padrão para datas
   */
  static dateFormat = 'YYYY-mm-ddTHH:MM:ssZ';

  /**
   * Converte texto para data
   *
   * @param {string} param Texto para ser convertido
   *
   *  @returns {Date}
   */
  static stringToDate (param: any) {
    return param
      ? moment(new Date(param)) // moment(param, env.datetime.format.date).toDate():
      : moment().toDate()
  }

  /**
   * Converte texto para data e tempo
   *
   * @param {string} param Texto para ser convertido
   *
   *  @returns {Date}
   */
  static stringToDatetime (param: any) {
    return param
      ? moment(new Date(param)) // moment(param, env.datetime.format.datetime).toDate():
      : moment().toDate()
  }

  /**
   * Converte data para texto
   *
   * @param {Date} param Data para ser convertida
   *
   *  @returns {string}
   */
  static dateToString (param: any) {
    /*
       param? moment(param).format(env.datetime.format.datetime) :
       moment().format(env.datetime.format.datetime);
    */
    return param ? param.toString() : new Date().toString()
  }

  /**
   * Converte data com horário para texto
   *
   * @param {Date} param Data com horário para ser convertida
   *
   *  @returns {string}
   */
  static datetimeToString (param: any) {
    return param
      ? param.toString() // moment(param).format(env.datetime.format.datetime):
      : new Date().toString() // moment().format(env.datetime.format.datetime);
  }

  /**
   * Converte data com horário para texto
   *
   * @param {any} _key Chave a ser substituída
   * @param {any} value Data
   *
   * @returns {string}
   * @todo verificar a necessidade desta função
   */
  static replacer (_key: any, value: any) {
    if (value instanceof Date) {
      return this.datetimeToString(value)
    }
    return value
  }
}

export const service = new DateUtils()
export default service
