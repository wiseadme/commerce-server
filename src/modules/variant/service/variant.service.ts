import { IVariantService } from '@/types/services'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@/types/models'
import { IVariantRepository } from '@/types/repositories'

@injectable()
export class VariantService implements IVariantService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.VariantRepository) private repository: IVariantRepository
  ){
  }

  async create(variant: IVariant){
    return await this.repository.create(variant)
  }
}
