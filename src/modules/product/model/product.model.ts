import { model, Schema, Document } from 'mongoose'
import { IProduct } from '@/types/models'

const ProductSchema = new Schema<IProduct & Document>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    index: true
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
      _id: false,
      title: String,
      description: String,
      keywords: String
    },
    default: null
  },
  attributes: {
    type: [ {
      meta: String,
      name: String,
      value: String,
      _id: false,
    } ],
    default: []
  },
  assets: {
    type: [ {
      url: String,
      type: String
    } ],
    default: []
  },
  variants: {
    type: [ {
      type: Schema.Types.ObjectId,
      ref: 'Variant',
    } ],
    default: []
  },
}, {
  timestamps: true
})

export const ProductModel = model<IProduct>('Product', ProductSchema)
