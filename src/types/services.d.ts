import { Document } from 'mongoose';
import { ICategory, IProduct } from './models';

export interface ICategoryService {
  create: (category: ICategory) => Promise<Document<ICategory>>;
  read: (query: { id?: string }) => Promise<Array<ICategory>>;
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

export interface IProductService {
  create: (product: IProduct) => Promise<Document<IProduct>>
  read: (query: any) => Promise<Array<Document<IProduct>>>
}
