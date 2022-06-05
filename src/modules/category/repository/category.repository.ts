import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { CategoryModel } from '../model/category.model'
import { TYPES } from '@common/schemes/di-types'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ICategory } from '../types/model'
import { ICategoryRepository } from '../types/repository'
import { ILogger } from '@/types/utils'

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create(category: ICategory){

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

    await Promise.all([
      created.populate('parent'),
      created.populate('children')
    ])

    return created
  }

  async read<T extends { id?: string }>({ id }: T){
    id && validateId(id)

    const params = id ? { _id: id } : {}

    const categories = await CategoryModel
      .find(params)
      .populate('parent', [ 'title', 'url', 'children' ])
      .populate('children', [ 'title', 'url', 'children' ])

    if (id && !categories.length) {
      throw ({ status: 404, message: 'not found' })
    }

    return categories
  }

  async update(updates: Partial<ICategory & Document>){
    validateId(updates._id)

    const updated = await CategoryModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    )
      .populate('parent', [ 'title', 'url' ])
      .populate('children', [ 'title', 'url' ]) as Document<ICategory>

    return { updated }
  }

  async delete(id){
    validateId(id)

    return !!await CategoryModel.findByIdAndDelete(id)
  }
}
