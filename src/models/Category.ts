import mongoose from 'mongoose'

const { Schema, model } = mongoose

const category = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  image: String,
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  order: Number
}, {
  timestamps: true
})

export default model('Category', category)