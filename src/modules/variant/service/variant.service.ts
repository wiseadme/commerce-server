import { IVariantService } from '@/types/services'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@/types/models'
import { IVariantRepository } from '@/types/repositories'
import { Document } from 'mongoose'

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

  async read(productId: string){
    return await this.repository.read(productId)
  }

  async update(updates: Partial<IVariant & Document>){
    return this.repository.update(updates)
  }

  async delete(id: string){
    return await this.repository.delete(id)
  }
}
