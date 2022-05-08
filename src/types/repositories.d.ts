import { ICategory, IProduct, IVariant } from './models'
import { Document } from 'mongoose'
import { ProductQuery } from '@/types/types'
import { Request, Response } from 'express'

export interface IBaseRepository {
  validateId(id: string): boolean | undefined
}

export type AssetsResponse = { url: string }

export interface ICategoryRepository {
  create: (category: ICategory) => Promise<Document>
  read: (query: any) => Promise<Array<ICategory & Document>>
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>
  delete: (id: string) => Promise<boolean>
}

export interface IProductRepository {
  create: (product: IProduct) => Promise<Document>
  read: (query: ProductQuery) => Promise<Array<IProduct & Document>>
  update: (updates: Partial<Document<IProduct>>) => Promise<{ updated: Document<IProduct> }>
  delete: (id: string) => Promise<boolean>
}

export interface IVariantRepository {
  create: (variant: IVariant) => Promise<Document>
  read: (productId: string) => Promise<Array<Document & IVariant>>
  update: (updates: Partial<IVariant & Document>) => Promise<{ updated: Document<IVariant> }>
  delete: (id: string) => Promise<boolean>
}

export interface IAssetsRepository {
  save: (req: Request, res: Response) => Promise<AssetsResponse>
  delete: (id: string, fileName?: string) => any
}
