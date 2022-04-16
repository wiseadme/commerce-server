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
    return new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      url: product.url,
      categories: product.categories,
      variants: product.variants,
      assets: product.assets,
      seo: product.seo
    }).save()
  }

  async read(params): Promise<Array<IProduct & Document>>{
    if (params.category) {
      const { category, page, count } = params

      return ProductModel
        .find({ categories: { $in: category } })
        .skip((page * count) - count)
        .limit(count)
    }

    params && validateId(params)
    return ProductModel.find({ _id: params })
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
