import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { ICategory, IProduct, IVariant } from './models'
import { ProductQuery } from '@/types/types'

export interface ICategoryService {
  create: (category: ICategory) => Promise<Document<ICategory>>;
  read: (query: { id?: string }) => Promise<Array<ICategory>>;
  update: (updates: Partial<ICategory & Document>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

export interface IProductService {
  create: (product: IProduct) => Promise<Document<IProduct>>
  read: (query: ProductQuery) => Promise<Array<Document<IProduct>>>,
  update: (updates: Partial<IProduct & Document>) => Promise<{ updated: Document<IProduct> }>
  delete: (id: string) => Promise<boolean>
}

export interface IVariantService {
  create: (variant: IVariant) => Promise<Document<IVariant>>
  read: (productId: string) => Promise<Array<Document<IVariant>>>
  update: (updates: Partial<IVariant & Document>) => Promise<{ updated: Document<IVariant> }>
}

export interface IFilesService {
  saveFile: (req: Request, res: Response) => Promise<{ url: string }>
  deleteFile: (fileName: string) => Promise<boolean>
  // getFile: (url: string) => File
}
