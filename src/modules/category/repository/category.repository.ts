import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { ICategoryRepository } from '@/types/repositories'
import { ICategory } from '@/types/models'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
  }

  async create(category: ICategory) {
    const created = await new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      title: category.title,
      url: category.url,
      order: category.order,
      seo: category.seo,
      image: category.image,
      parent: category.parent || null,
      children: category.children || []
    }).save()

    if (created.parent) {
      const parent = await CategoryModel.findById(category.parent)
      parent!.children.push(created._id as any)
      parent!.save()
    }

    return created
  }

  async read<T extends { id?: string }>({ id }: T) {
    id && validateId(id)

    const params = id ? { _id: id } : {}
    const categories = await CategoryModel
      .find(params)
      .populate('parent', [ 'title' ])
      .populate('children', [ 'title' ])

    if (id && !categories.length) {
      throw ({ status: 404, message: 'not found' })
    }

    return categories
  }

  async update($set: Partial<ICategory & Document>) {
    validateId($set._id)

    const updated = await CategoryModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    ) as Document<ICategory>

    return { updated }
  }

  async delete(id) {
    validateId(id)

    return !!await CategoryModel.findByIdAndDelete({ _id: id })
  }
}
