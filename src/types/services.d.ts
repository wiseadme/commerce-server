import { Document } from 'mongoose';
import { ICategory, IProduct } from './models';

interface ICategoryService {
  create: (category: ICategory) => Promise<Document<ICategory>>;
  read: (query: { id?: string }) => Promise<Array<ICategory>>;
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

interface IProductService {
  create: (product: IProduct) => Promise<Document<IProduct>>
}
