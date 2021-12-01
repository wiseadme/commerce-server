import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@/app/schemes/di-types'
import { ILogger } from '@/types/utils'
import { ICategoryRepository } from '@/types/repositories'
import { ICategory } from '@/types/models'

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
  }

  async create(category) {
    return new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      ...category
    }).save()
  }

  async read(params) {
    return CategoryModel.find(params as any)
  }

  async update(updates) {
    const $set = updates

    if ($set.seo) {
      $set.seo = JSON.parse($set.seo)
    }

    const updated = await CategoryModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    ) as Document<ICategory>

    return { updated }
  }

  async delete() {
    return true
  }
}
