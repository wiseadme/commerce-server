import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'

// Model
import { CategoryModel } from '../model/category.model'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '../../../app/schemes/di-types'

// Types
import { ICategory } from '../../../types/models'
import { ICategoryService } from '../../../types/services'
import { ILogger } from '../../../types/utils'

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.CategoryRepository) private categoryRepository: any
  ) {
  }

  async create({ title, seo, order }: ICategory) {
    const category = new Category(title, order)
    seo && category.setSeo(seo)

    return await this.categoryRepository.create(category)
  }

  async update(updates: any): Promise<{ updated: Document<ICategory> }> {
    return this.categoryRepository.update(updates)
  }

  async read({ category_id }: any) {
    const queryParams = category_id ? { _id: category_id } : {}
    return CategoryModel.find(queryParams as any)
  }

  async delete(id: string): Promise<boolean> {
    await CategoryModel.findByIdAndDelete({ _id: id })
    return true
  }
}
