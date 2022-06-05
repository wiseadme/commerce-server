import { Document } from 'mongoose'
import { IAttribute } from './model'

export interface IAttributeRepository {
  create(attribute: IAttribute): Promise<Document>

  read(id?: string): Promise<Array<Document & IAttribute>>

  update(updates: Array<IAttribute & Document>): Promise<{ updated: Array<Document<IAttribute>> }>

  delete(id: string): Promise<boolean>
}
