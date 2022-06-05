import { Document } from 'mongoose'
import { IVariant } from './model'

export interface IVariantService {
  create(variant: IVariant): Promise<Document<IVariant>>

  read(productId: string): Promise<Array<Document<IVariant>>>

  update(updates: Partial<IVariant & Document>): Promise<{ updated: Document<IVariant> }>

  delete(id: string): Promise<boolean>
}
