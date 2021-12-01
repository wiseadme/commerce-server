import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'

// Model
import { CategoryModel } from '../model/category.model'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '@/common/schemes/di-types'

// Types
import { ICategory, IJSONCategory } from '@/types/models'
import { ICategoryService } from '@/types/services'
import { ILogger } from '@/types/utils'
import { ICategoryRepository } from '@/types/repositories'

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.CategoryRepository) private repository: ICategoryRepository
  ) {
  }

  async create({ title, seo, image, order }: IJSONCategory) {
    const category = new Category({ title, order, seo: seo && JSON.parse(seo!), image })

    return await this.repository.create(category)
  }

  async update({
    title,
    seo,
    order,
    _id
  }: Partial<Document & IJSONCategory>): Promise<{ updated: Document<ICategory> }> {
    seo && (seo = JSON.parse(seo))

    return this.repository.update({ title, seo, order, _id } as ICategory)
  }

  async read({ category_id }: any) {
    const params = category_id ? { _id: category_id } : {}

    return await this.repository.read(params)
  }

  async delete(id: string): Promise<boolean> {
    await CategoryModel.findByIdAndDelete({ _id: id })
    return true
  }
}
