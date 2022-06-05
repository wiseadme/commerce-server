import { IAttribute } from '../types/model'

export class Attribute implements IAttribute {
  private _key: string
  private _value: string
  private _meta: string
  private _order: number

  constructor({ key, value, meta, order }){
    this._key = key
    this._value = value
    this._meta = meta
    this._order = order
  }

  get key(){
    return this._key
  }

  get value(){
    return this._value
  }

  get meta(){
    return this._meta
  }

  get order(){
    return this._order
  }

  static create(attribute: IAttribute){
    return new Attribute(attribute)
  }
}
