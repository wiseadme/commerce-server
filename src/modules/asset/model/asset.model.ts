import { Document, model, Schema } from 'mongoose'
import { IAssetItem } from '../types/model'

const AssetSchema: Schema = new Schema<IAssetItem & Document>({
  _id: Schema.Types.ObjectId,
  url: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    required: false
  },
  fileName: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  main: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export const AssetModel = model<IAssetItem>('Asset', AssetSchema)
