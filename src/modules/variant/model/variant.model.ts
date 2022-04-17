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
  // options: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Option'
  //   }
  // ]
}, {
  timestamps: true
})

export const VariantModel = model<IVariant>('Variant', VariantSchema)
