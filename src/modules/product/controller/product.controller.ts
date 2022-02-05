import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { BaseController } from '@/common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import expressAsyncHandler from 'express-async-handler';

// Types
import { ILogger } from '@/types/utils';
import { IController } from '@/types';
import { ProductModel } from '@/modules/product/model/product.model';

@injectable()
export class ProductController extends BaseController implements IController {
  public path = '/v1/product';
  public router = Router();

  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger,) {
    super();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/', expressAsyncHandler(this.createProduct.bind(this)));
  }

  async createProduct({ body, method }: Request<{}, {}, {}>, res: Response) {
    try {
      const product = await ProductModel.create({
        _id: new mongoose.Types.ObjectId(),
        ...body
      });
      this.send(res, method, product, this.path);
    } catch (err) {
      return this.error(method, err, this.path);
    }
  }
}
