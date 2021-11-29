import mongoose, { Document } from 'mongoose'
import CategoryModel from '../model/category.model'
import { ICategory } from '../../../types/models'
import { ICategoryService } from '../../../types/services'
import { translator } from '../../../utils/translator'
import { injectable } from 'inversify'

@injectable()
export class CategoryService implements ICategoryService {
  async create({ title, seo, order }: ICategory) {

    const created = new CategoryModel({
      _id: new mongoose.Types.ObjectId(),
      url: translator(title),
      seo: JSON.parse(seo as any),
      title,
      order
    })

    return created.save()
  }

  async update(updates: any): Promise<{ updated: Document<ICategory> }> {
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

  async read({ category_id }: any) {
    const queryParams = category_id ? { _id: category_id } : {}
    return CategoryModel.find(queryParams as any)
  }

  async delete(id: string): Promise<boolean> {
    await CategoryModel.findByIdAndDelete({ _id: id })
    return true
  }
}

export default new CategoryService()
