import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IAttributeService } from '../types/service'
import { IAttributeRepository } from '../types/repository'
import { IAttribute } from '../types/model'

@injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IAttributeRepository) private repository: IAttributeRepository
  ){
  }

  create(attribute){
    return this.repository.create(attribute)
  }

  read(id?: string): Promise<Array<Document<IAttribute>>>{
    return this.repository.read(id)
  }

  update(updates: Array<IAttribute & Document>): Promise<{ updated: Array<Document<IAttribute>> }>{
    return this.repository.update(updates)
  }

  delete(id: string): Promise<boolean>{
    return this.repository.delete(id)
  }
}
