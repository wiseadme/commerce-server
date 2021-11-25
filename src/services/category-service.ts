import mongoose, { Document } from 'mongoose'
import Category from '../models/CategoryModel'
import { CategoryType } from '../types/models'
import { translator } from '../utils/translator'

interface CategoryServiceType {
  create: (category: CategoryType) => Promise<CategoryType & Document>
}

class CategoryService implements CategoryServiceType {
  async create(category: CategoryType) {

    const created = new Category({
      _id: new mongoose.Types.ObjectId(),
      title: category.title,
      url: translator(category.title),
      seo: JSON.parse(category.seo as any),
      order: category.order
    })

    return created.save()
  }
}

export default new CategoryService()
