import { model, Schema, Document } from 'mongoose'
import { IProduct } from '@/types/models'

const ProductSchema = new Schema<IProduct & Document>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  categories: {
    type: [ {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    } ],
    required: true
  },
  image: {
    type: String,
    default: null
  },
  seo: {
    type: {
      title: String,
      description: String,
      keywords: String
    },
    default: null
  },
  assets: [
    {
      url: String,
      type: String
    }
  ],
  variants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Variant',
    }
  ],
}, {
  timestamps: true
})

export const ProductModel = model<IProduct>('Product', ProductSchema)
