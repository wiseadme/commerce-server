import { Document, Query } from 'mongoose';
import { inject, injectable } from 'inversify';

// Model
import { CategoryModel } from '../model/category.model';

// Entity
import { Category } from '../entity/category.entity';

// Schemes
import { TYPES } from '@/common/schemes/di-types';

// Types
import { ICategory, IJSONCategory } from '@/types/models';
import { ICategoryService } from '@/types/services';
import { ILogger } from '@/types/utils';
import { ICategoryRepository } from '@/types/repositories';

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.CategoryRepository) private repository: ICategoryRepository
  ) {
  }

  async create(category: IJSONCategory) {
    return await this.repository.create(Category.create(category));
  }

  async update(update: Partial<Document & IJSONCategory>): Promise<{ updated: Document<ICategory> }> {
    return this.repository.update(Category.update(update));
  }

  async read<T extends { id?: string }>(query: T) {
    return await this.repository.read(query);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
