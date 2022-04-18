import { IVariantRepository } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@/types/models'
import { VariantModel } from '@modules/variant/model/variant.model'
import { Types } from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class VariantRepository implements IVariantRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  create(variant: IVariant){
    validateId(variant.product)

    return new VariantModel({
      _id: new Types.ObjectId(),
      ...variant
    }).save()
  }
}
