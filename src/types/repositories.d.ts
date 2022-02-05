import { ICategory, IProduct } from './models';
import { Document } from 'mongoose';

export interface IBaseRepository {
  validateId(id: string): boolean | undefined;
}

export interface ICategoryRepository {
  create: (category: ICategory) => Promise<Document<ICategory>>;
  read: (query: any) => Promise<Array<ICategory>>;
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

export interface IProductRepository {
  create: (product: IProduct) => Promise<Document<IProduct>>;
}
