import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IAttributeService } from '@/types/services'
import { IAttributeRepository } from '@/types/repositories'
import { IAttribute } from '@/types/models'

@injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.AttributeRepository) private repository: IAttributeRepository
  ){
  }

  async create(attribute){
    return this.repository.create(attribute)
  }

  async read(id?: string): Promise<Array<Document<IAttribute>>>{
    return this.repository.read(id)
  }

  async update(updates: Partial<IAttribute & Document>): Promise<{ updated: Document<IAttribute> }>{
    return this.repository.update(updates)
  }

  async delete(id: string): Promise<boolean>{
    return this.repository.delete(id)
  }
}
