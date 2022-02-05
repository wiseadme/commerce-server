import { Document } from 'mongoose';
import { IJSONCategory, ICategory } from './models';

interface ICategoryService {
  create: (category: IJSONCategory) => Promise<Document<ICategory>>;
  read: (query: { id?: string }) => Promise<Array<ICategory>>;
  update: (updates: Partial<IJSONCategory>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

interface IVariantsService {

}
