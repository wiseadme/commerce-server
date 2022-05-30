import mongoose, { Document } from 'mongoose'
import { IAttributeRepository } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IAttribute } from '@/types/models'
import { AttributeModel } from '@modules/attribute/model/attribute.model'
import { validateId } from '@common/utils/mongoose-validate-id'

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
      meta: attribute.meta
    }).save()
  }

  async read(id?: string): Promise<Array<Document & IAttribute>>{
    return AttributeModel.find({ id })
  }

  async update(updates: Partial<IAttribute & Document>): Promise<{ updated: Document<IAttribute> }>{
    validateId(updates._id)

    const updated = await AttributeModel.findByIdAndUpdate(
      { _id: updates._id },
      { $set: updates },
      { new: true }
    ) as Document<IAttribute>

    return { updated }
  }

  async delete(id){
    return !!await AttributeModel.findByIdAndDelete(id)
  }
}
