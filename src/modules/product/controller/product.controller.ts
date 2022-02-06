import { Router, Request, Response } from 'express';
import { BaseController } from '@/common/controller/base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import expressAsyncHandler from 'express-async-handler';

// Types
import { ILogger } from '@/types/utils';
import { IController } from '@/types';
import { IProduct } from '@/types/models';
import { IProductService } from '@/types/services';

@injectable()
export class ProductController extends BaseController implements IController {
  public path = '/v1/product';
  public router = Router();

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IProductService) private service: IProductService
  ){
    super();
    this.initRoutes();
  }

  public initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createProduct.bind(this)));
  }

  async createProduct({ body, method }: Request<{}, {}, IProduct>, res: Response){
    try {
      const product = await this.service.create(body);
      this.send(res, method, product, this.path);
    } catch (err) {
      return this.error(method, err, this.path);
    }
  }

  async getProducts() {

  }
}
