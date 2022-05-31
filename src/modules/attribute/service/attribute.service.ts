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
