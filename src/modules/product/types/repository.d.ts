import { IProduct } from './model'
import { Document } from 'mongoose'
import { ProductQuery } from './params'

export interface IProductRepository {
  create(product: IProduct): Promise<Document>

  read(query: ProductQuery): Promise<Array<IProduct & Document>>

  update(updates: Partial<Document<IProduct>>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}
