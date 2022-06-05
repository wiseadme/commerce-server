import { IUnit } from '../types/model'

export class Unit implements IUnit {
  private _value: IUnit['value']
  private _meta: IUnit['meta']

  constructor({ value, meta }: IUnit){
    this._value = value
    this._meta = meta
  }

  get value(){
    return this._value
  }

  get meta(){
    return this._meta
  }

  static create(unit = {}){
    return new Unit(unit as IUnit)
  }
}
