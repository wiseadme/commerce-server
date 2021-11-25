import mongoose, { Document } from 'mongoose'
import CategoryModel from '../models/CategoryModel'
import { ICategory } from '../types/models'
import { translator } from '../utils/translator'

interface ICategoryService {
  create: (category: ICategory) => Promise<ICategory & Document>
}

class CategoryService implements ICategoryService {
  async create(category: ICategory) {
    const created = new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      title: category.title,
      url: translator(category.title),
      seo: JSON.parse(category.seo as any),
      order: category.order
    })

    return created.save()
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
    )

    return { updated }
  }
}

export default new CategoryService()
