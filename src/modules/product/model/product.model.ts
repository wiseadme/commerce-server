import { model, Schema, Document } from 'mongoose';
import { IProduct } from '@/types/models';

const ProductSchema = new Schema<IProduct & Document>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
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
    type: [ String ],
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
      group: String,
      options: [
        {
          value: {
            type: String,
            required: true
          },
          price: {
            type: Number,
            default: 0
          },
          quantity: {
            type: Number,
            default: 0
          },
          sku: {
            type: String,
            default: null
          },
          image: {
            type: String,
            default: null
          }
        }
      ]
    }
  ],
}, {
  timestamps: true
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
