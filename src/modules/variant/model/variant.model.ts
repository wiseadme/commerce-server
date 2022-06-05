import { model, Schema, Document } from 'mongoose'
import { IVariant } from '../types/model'

const VariantSchema = new Schema<Document & IVariant>({
  _id: Schema.Types.ObjectId,
  group: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  options: [
    {
      sku: String,
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        default: 0
      },
      image: String,
      assets: {
        type: Array,
        default: null
      }
    }
  ]
}, {
  timestamps: true
})

export const VariantModel = model<IVariant>('Variant', VariantSchema)
