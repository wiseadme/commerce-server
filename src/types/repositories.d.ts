import { ICategory, IProduct } from './models';
import { Document } from 'mongoose';

export interface IBaseRepository {
  validateId(id: string): boolean | undefined;
}

export type FileResponse = { url: string }

export interface ICategoryRepository {
  create: (category: ICategory) => Promise<Document>;
  read: (query: any) => Promise<Array<ICategory & Document>>;
  update: (updates: Partial<ICategory>) => Promise<{ updated: Document<ICategory> }>;
  delete: (id: string) => Promise<boolean>;
}

export interface IProductRepository {
  create: (product: IProduct) => Promise<Document>;
  read: (query: any) => Promise<Array<IProduct & Document>>
}

export interface IFilesRepository {
  save: (req: Request, res: Response) => Promise<FileResponse>
  delete: (fileName: string) => Promise<boolean>
}
