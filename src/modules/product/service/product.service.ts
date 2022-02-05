import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';

// Entity
import { Product } from '@/modules/product/entity/product.entity';

// Types
import { ILogger } from '@/types/utils';
import { IProductRepository } from '@/types/repositories';
import { IProductService } from '@/types/services';
import { IProduct } from '@/types/models';

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ProductRepository) private repository: IProductRepository,
  ) {
  }

  async create(product: IProduct) {
    return await this.repository.create(Product.create(product));
  }
}
