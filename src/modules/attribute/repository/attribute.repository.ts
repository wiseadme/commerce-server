import mongoose, { Document } from 'mongoose'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { AttributeModel } from '@modules/attribute/model/attribute.model'
import { validateId } from '@common/utils/mongoose-validate-id'
// Types
import { ILogger } from '@/types/utils'
import { IAttribute } from '../types/model'
import { IAttributeRepository } from '../types/repository'

@injectable()
export class AttributeRepository implements IAttributeRepository {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ){
  }

  async create(attribute: IAttribute): Promise<Document>{
    return new AttributeModel({
      _id: new mongoose.Types.ObjectId(),
      key: attribute.key,
      value: attribute.value,
      meta: attribute.meta,
      order: attribute.order
    }).save()
  }

  async read(id?: string): Promise<Array<Document & IAttribute>>{
    return AttributeModel.find({ id })
  }

  async update(updates: Array<IAttribute & Document>): Promise<{ updated: Array<Document<IAttribute>> }>{
    const updated: Array<Document<IAttribute>> = []

    for (const attr of updates) {
      validateId(attr._id)

      const attribute = await AttributeModel.findByIdAndUpdate(
        { _id: attr._id },
        { $set: attr },
        { new: true }
      ) as Document<IAttribute>

      updated.push(attribute)
    }

    return { updated }
  }

  async delete(id){
    return !!await AttributeModel.findByIdAndDelete(id)
  }
}
