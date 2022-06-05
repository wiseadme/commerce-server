import { IUnit } from './model'
import { Document } from 'mongoose'

export interface IUnitRepository {
  create(unit: IUnit): Promise<Document & IUnit>

  read(id?: string): Promise<Array<Document & IUnit>>

  delete(id: string): Promise<boolean>
}
