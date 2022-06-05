import { IVariant } from '../types/model'

export class Variant {
  private readonly _group: string
  private readonly _product: string
  private readonly _options: any[]

  constructor({ group, product, options }){
    this._group = group
    this._product = product
    this._options = options
  }

  get group(){
    return this._group
  }

  get product(){
    return this._product
  }

  get options(){
    return this._options
  }

  static create(variant: IVariant){
    return new Variant(variant)
  }
}
