import { model, Schema, Document } from 'mongoose'
import { IVariant } from '@/types/models'

const VariantSchema = new Schema<IVariant & Document>({
  _id: Schema.Types.ObjectId,
  group: {
    type: String,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
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
