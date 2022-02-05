import { model, Schema, Document } from 'mongoose';
import { IProduct } from '@/types/models';

const ProductSchema = new Schema<IProduct & Document>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  seo: {
    title: String,
    description: String,
    keywords: String
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
          price: {
            type: Number,
            default: 0
          },
          quantity: {
            type: Number,
            default: 0
          },
          sku: {
            type: String
          },
          image: {
            type: String
          }
        }
      ]
    }
  ],
}, {
  timestamps: true
});

export const ProductModel = model<IProduct>('Variant', ProductSchema);
