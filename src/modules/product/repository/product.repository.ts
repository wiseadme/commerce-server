import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '../types/repository'
import { IProduct } from '../types/model'
import { ProductQuery } from '../types/params'
import { ILogger } from '@/types/utils'

import { translator } from '@common/utils/translator'

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create(product: IProduct){
    return (await new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      url: product.url,
      count: product.count,
      categories: product.categories,
      variants: product.variants,
      attributes: product.attributes,
      unit: product.unit,
      assets: product.assets,
      seo: product.seo
    }).save()).populate([ 'categories', 'assets', 'variants' ])
  }

  async read(params: string | ProductQuery){
    const DEFAULT_COUNT = 20
    const DEFAULT_PAGE = 1

    if (typeof params === 'object') {
      let search

      const { category, page = DEFAULT_PAGE, count = DEFAULT_COUNT } = params as ProductQuery

      if (params.category) {
        search = { categories: { $in: category } }
      }

      if (params.name) {
        search = { 'name': { '$regex': `.*${ params.name }*.`, '$options': 'i' } }
      }

      return ProductModel
        .find(search)
        .populate([ 'categories', 'variants', 'assets' ])
        .skip((page * count) - count)
        .limit(count)
    }

    // here we sure that params is the product id
    // string type and that's why need validate it
    params && validateId(params)

    return ProductModel.find({ _id: params }).populate([ 'categories', 'variants' ])
  }

  async update($set: Partial<Document<IProduct>>){
    validateId($set._id)

    const updated = await ProductModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    ).populate([
      'assets', 'categories', 'variants'
    ]) as Document<IProduct>

    return { updated }
  }

  async delete(id){
    validateId(id)

    return !!await ProductModel.findOneAndDelete({ _id: id })
  }
}
