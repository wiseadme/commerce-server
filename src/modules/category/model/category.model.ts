import { Document, model, Schema } from 'mongoose'
import { ICategory } from '../types/model'

const CategorySchema: Schema = new Schema<ICategory & Document>({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    unique: true
  },
  image: String,
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  children: [ {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    _id: false
  } ],
  isVisible: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true
})

export const CategoryModel = model<ICategory>('Category', CategorySchema)
