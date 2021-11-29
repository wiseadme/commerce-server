import { model, Schema } from 'mongoose'
import { ICategory } from '../../../types/models'

const CategorySchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true
  },
  url: String,
  image: String,
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export const CategoryModel =  model<ICategory>('Category', CategorySchema)
