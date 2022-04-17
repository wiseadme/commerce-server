import { IVariantRepository } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@/types/models'
import { VariantModel } from '@modules/variant/model/variant.model'
import { Types } from 'mongoose'

@injectable()
export class VariantRepository implements IVariantRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger){
  }

  create(variant: IVariant){
    return new VariantModel({
      _id: new Types.ObjectId(),
      ...variant
    }).save()
  }
}
