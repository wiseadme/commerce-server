import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@/common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { ICategoryRepository } from '@/types/repositories'
import { ICategory } from '@/types/models'
import { translator } from '@/common/utils/translator'

const validate = id => {
  if (!mongoose.isValidObjectId(id)) {
    throw ({ status: 403, message: 'model id is not valid' })
  }
}

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
  }

  async create(category: ICategory) {
    return new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      title: category.title,
      order: category.order,
      seo: category.seo
    }).save()
  }

  async read(params: Partial<ICategory> & Document) {
    validate(params._id)
    const categories = await CategoryModel.find(params as any)

    if (params._id && !categories.length) {
      throw ({ status: 404, message: 'not found' })
    }

    return categories
  }

  async update($set) {
    if ($set.title) {
      $set.url = translator($set.title)
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
