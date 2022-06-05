import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { VariantModel } from '@modules/variant/model/variant.model'
import { Types } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { Document } from 'mongoose'
import { ILogger } from '@/types/utils'
import { IVariant } from '../types/model'
import { IVariantRepository } from '../types/repository'

@injectable()
export class VariantRepository implements IVariantRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  async create({ group, product, options }: IVariant){
    validateId(product)

    return new VariantModel({
      _id: new Types.ObjectId(),
      group,
      product,
      options
    }).save()
  }

  async read(productId: string){
    validateId(productId)

    return VariantModel.find({ product: productId })
  }

  async update($set: Partial<Document<IVariant>>){
    validateId($set.id)

    const updated = await VariantModel.findByIdAndUpdate(
      { _id: $set._id },
      { $set },
      { new: true }
    ) as Document<IVariant>

    return { updated }
  }

  async delete(id: string){
    validateId(id)

    return !!await VariantModel.findOneAndDelete({ _id: id })
  }
}
