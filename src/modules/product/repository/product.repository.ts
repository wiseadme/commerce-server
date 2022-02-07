import mongoose, { Document } from 'mongoose';
import { IProductRepository } from '@/types/repositories';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import { ILogger } from '@/types/utils';
import { IProduct } from '@/types/models';
import { ProductModel } from '@/modules/product/model/product.model';
import { validateId } from '@/common/utils/mongoose-validate-id';

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
  }

  async create(product: IProduct) {
    return new ProductModel({
      _id: new mongoose.Types.ObjectId(),
      ...product
    }).save()
  }

  async read(query) {
    return '' as any
  }
}
