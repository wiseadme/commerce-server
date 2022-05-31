import { IAssetItem, IAttribute, ICategory, IProduct, IVariant } from './models'
import { Document } from 'mongoose'
import { ProductQuery } from '@/types/types'
import { Request, Response } from 'express'
import { IAssetsService } from '@/types/services'

export interface IBaseRepository {
  validateId(id: string): boolean | undefined
}

export type AssetsResponse = { url: string }

export interface ICategoryRepository {
  create(category: ICategory): Promise<Document>

  read(query: any): Promise<Array<ICategory & Document>>

  update(updates: Partial<ICategory>): Promise<{ updated: Document<ICategory> }>

  delete(id: string): Promise<boolean>
}

export interface IProductRepository {
  create(product: IProduct): Promise<Document>

  read(query: ProductQuery): Promise<Array<IProduct & Document>>

  update(updates: Partial<Document<IProduct>>): Promise<{ updated: Document<IProduct> }>

  delete(id: string): Promise<boolean>
}

export interface IVariantRepository {
  create(variant: IVariant): Promise<Document>

  read(productId: string): Promise<Array<Document & IVariant>>

  update(updates: Partial<IVariant & Document>): Promise<{ updated: Document<IVariant> }>

  delete(id: string): Promise<boolean>
}

export interface IAttributeRepository {
  create(attribute: IAttribute): Promise<Document>

  read(id?: string): Promise<Array<Document & IAttribute>>

  update(updates: Partial<IAttribute & Document>): Promise<{ updated: Document<IAttribute> }>

  delete(id: string): Promise<boolean>
}

export interface IAssetsRepository {
  save(req: Request, res: Response): Promise<AssetsResponse>

  update(updates: Partial<IAssetItem>): Promise<{ updated: IAssetItem }>

  delete(id: string, fileName?: string): any
}
