import { IAttribute } from '@/types/models'

export class Attribute implements IAttribute{
  private _key: string
  private _value: string
  private _meta: string

  constructor({ key, value, meta }){
    this._key = key
    this._value = value
    this._meta = meta
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

  static create(attribute: IAttribute){
    return new Attribute(attribute)
  }
}
