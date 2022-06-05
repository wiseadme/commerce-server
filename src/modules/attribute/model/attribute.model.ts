import { model, Schema, Document } from 'mongoose'
import { IAttribute } from '../types/model'

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
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export const AttributeModel = model<IAttribute>('Attribute', AttributeSchema)
