import { model, Schema, Document } from 'mongoose'
import { IAttribute } from '@/types/models'

const AttributeSchema = new Schema<Document & IAttribute>({
  _id: Schema.Types.ObjectId,
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  meta: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

export const AttributeModel = model<IAttribute>('Attribute', AttributeSchema)
