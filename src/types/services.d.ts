import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { IAttribute, ICategory, IProduct, IVariant } from './models'
import { ProductQuery } from '@/types/types'

export interface ICategoryService {
  create(category: ICategory): Promise<Document<ICategory>>;

  read(query: { id?: string }): Promise<Array<ICategory>>;

  update(updates: Partial<ICategory & Document>): Promise<{ updated: Document<ICategory> }>;

  delete(id: string): Promise<boolean>;
}

export interface IProductService {
  create(product: IProduct): Promise<Document<IProduct>>

  read(query: ProductQuery): Promise<Array<Document<IProduct>>>,

  update(updates: Partial<IProduct & Document>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}

export interface IAttributeService {
  create(attribute: IAttribute): Promise<Document<IAttribute>>

  read(id?: string): Promise<Array<Document<IAttribute>>>,

  update(updates: Partial<IAttribute & Document>): Promise<{ updated: Document<IAttribute> }>

  delete(id: string): Promise<boolean>
}

export interface IVariantService {
  create(variant: IVariant): Promise<Document<IVariant>>

  read(productId: string): Promise<Array<Document<IVariant>>>

  update(updates: Partial<IVariant & Document>): Promise<{ updated: Document<IVariant> }>

  delete(id: string): Promise<boolean>
}

export interface IAssetsService {
  saveFile(req: Request, res: Response): Promise<{ url: string }>

  deleteFile(params: { id: string, url: string }): Promise<boolean>
}

export interface IEventBusService {
  emit(event: string, data: any): void

  on(event: string, callback: (data: any) => any): void
}

