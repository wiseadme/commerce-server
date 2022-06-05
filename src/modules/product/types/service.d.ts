import { Document } from 'mongoose'
import { IProduct } from './model'
import { ProductQuery } from './params'

export interface IProductService {
  create(product: IProduct): Promise<Document<IProduct>>

  read(query: ProductQuery): Promise<Array<Document<IProduct>>>,

  update(updates: Partial<IProduct & Document>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}
