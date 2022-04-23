import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ProductModel } from '@modules/product/model/product.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { IProductRepository } from '@/types/repositories'
import { ILogger } from '@/types/utils'
import { IProduct } from '@/types/models'

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
      categories: product.categories,
      variants: product.variants,
      attributes: product.attributes,
      assets: product.assets,
      seo: product.seo
    }).save()).populate('categories')
  }

  async read(params): Promise<Array<IProduct & Document>>{
    let search
    const { category, page = 1, count = 20 } = params

    if (typeof params === 'object') {
      if (params.category) {
        search = { categories: { $in: category } }
      }

      if (params.name) {
        search = { 'name': { '$regex': `.*${ params.name }*.`, '$options': 'i' } }
      }

      return ProductModel
        .find(search)
        .populate([ 'categories', 'variants' ])
        .skip((page * count) - count)
        .limit(count)
    }

    params && validateId(params)
    return ProductModel.find({ _id: params }).populate([ 'categories', 'variants' ])
  }

  async update($set: Partial<Document<IProduct>>): Promise<{ updated: Document<IProduct> }>{
    validateId($set._id)

    const updated = await ProductModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    ) as Document<IProduct>

    return { updated }
  }
}
