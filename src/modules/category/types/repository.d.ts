import { ICategory } from './model'
import { Document } from 'mongoose'

export interface ICategoryRepository {
  create(category: ICategory): Promise<Document>

  read(query: any): Promise<Array<ICategory & Document>>

  update(updates: Partial<ICategory>): Promise<{ updated: Document<ICategory> }>

  delete(id: string): Promise<boolean>
}
