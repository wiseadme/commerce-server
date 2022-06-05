import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { ILogger } from '@/types/utils'
import { IUnitService } from '../types/service'
import { IUnitRepository } from '../types/repository'
import { IUnit } from '../types/model'

@injectable()
export class UnitService implements IUnitService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.IUnitRepository) private repository: IUnitRepository
  ){
  }

  create(unit: IUnit): Promise<Document & IUnit>{
    return this.repository.create(unit)
  }

  read(id?: string): Promise<Array<Document & IUnit>>{
    return this.repository.read(id)
  }

  delete(id: string): Promise<boolean>{
    return this.repository.delete(id)
  }
}
