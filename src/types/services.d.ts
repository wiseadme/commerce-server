import { Document } from 'mongoose'
import { ICategory } from './models'

interface ICategoryService {
  create: (category: ICategory) => Promise<Document<ICategory>>
  read: (query: any) => Promise<Array<ICategory>>
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>
  delete: (id: string) => Promise<boolean>
}