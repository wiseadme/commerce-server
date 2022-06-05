import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { UnitModel } from '../model/unit.model'

// Types
import { ILogger } from '@/types/utils'
import { IUnit } from '../types/model'
import { IUnitRepository } from '@modules/unit/types/repository'

@injectable()
export class UnitRepository implements IUnitRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
  }

  async create(unit: IUnit): Promise<Document & IUnit>{
    return new UnitModel({
      _id: new mongoose.Types.ObjectId(),
      value: unit.value,
      meta: unit.meta,
    }).save()
  }

  async read(id?: string): Promise<Array<Document & IUnit>>{
    return UnitModel.find({ id })
  }

  async delete(id): Promise<boolean>{
    return !!await UnitModel.findByIdAndDelete(id)
  }
}
