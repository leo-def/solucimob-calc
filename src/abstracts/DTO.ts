import _ from 'lodash'
import * as mongoose from 'mongoose'

export const cleanLabel = (result: string) => {
  result = result.trim()
  if (result.startsWith('-')) {
    result = result.substring(1).trim()
  }
  if (result.endsWith('-')) {
    result = result.substring(0, result.length - 1).trim()
  }
  if (result.startsWith('/')) {
    result = result.substring(1).trim()
  }
  if (result.endsWith('/')) {
    result = result.substring(0, result.length - 1).trim()
  }
  return result
}

export const generateId = () => {
  const id = mongoose.Types.ObjectId().toString()
  return id
}

export const compare = (a: any, b: any) => {
  return (
    a &&
    b &&
    a._id &&
    b._id &&
    a._id === b._id
  )
}

export const generateTempId = () => {
  return DTO.generateId()
}

export class DTO {
  static cleanLabel (result: string) {
    return cleanLabel(result)
  }

  static generateId () {
    return generateId()
  }

  static generateTempId () {
    return generateTempId()
  }

  static compare (a: any, b: any) {
    return compare(a, b)
  }

  static apply (obj: any, method: any, params?: any) {
    if (!obj || !obj[method]) {
      return null
    }
    return obj[method].apply(obj, params)
  }

  static fromJson (obj: any, json: any) {
    return DTO.apply(obj, 'fromJson', [json]) || JSON.parse(json)
  }

  static toJson (obj: any) {
    return DTO.apply(obj, 'toJson') || JSON.stringify(obj)
  }

  static fromForm (obj: any, json: any) {
    return DTO.apply(obj, 'fromForm', [json]) || JSON.parse(json)
  }

  static toForm (obj: any) {
    return DTO.apply(obj, 'toForm') || JSON.stringify(obj)
  }

  static isId (val: any) {
    return mongoose.Types.ObjectId.isValid(val)
  }

  constructor(defaultValues?: any) {
    if(defaultValues){
      this.load(defaultValues)
    }
  }

  load(defaultValues?: any, obj = this) {
    if (defaultValues) {
      if(typeof defaultValues === 'string'){
        defaultValues = JSON.parse(defaultValues)
      }
      if(defaultValues.toObject && typeof defaultValues.toObject === 'function') {
        defaultValues = defaultValues.toObject()
      }
      for (const [key, value] of Object.entries(defaultValues)) {
          obj[key] = value;
      }
    }
  }

  assign (target: any, source: any, config?: any): any {
    target = target || this as any
    // Object.assign(target, source)
    Object.keys(source).forEach(key => (target[key] = source[key]))
    return target
  }

  fromJson (json: any): any {
    if (!json) { return this }
    try {
      json = (typeof json === 'string') ? JSON.parse(json) : json
      this.assign(this, json)
    } catch (err) {}
    return this
  }

  toJson (value?: any): any {
    return JSON.stringify(value || this)
  }

  fromForm (form: any): any {
    return this.fromJson(form)
  }

  toForm (): any {
    return this.toJson()
  }

  toDTO (): any {
    return _.clone(this) as any
  }

  compare (b: any) {
    return compare(this, b)
  }
}
