import { ICategory } from './model'
import { Document } from 'mongoose'

export interface ICategoryService {
  create(category: ICategory): Promise<Document<ICategory>>;

  read(query: { id?: string }): Promise<Array<ICategory>>;

  update(updates: Partial<ICategory & Document>): Promise<{ updated: Document<ICategory> }>;

  delete(id: string): Promise<boolean>;
}
