import { Router, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'

import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'

// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IProduct } from '../types/model'
import { IProductService } from '../types/service'
import { ProductQuery } from '../types/params'

@injectable()
export class ProductController extends BaseController implements IController {
  public path = '/v1/products'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IProductService) private service: IProductService,
  ){
    super()
    this.initRoutes()
  }

  public initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createProduct.bind(this)))
    this.router.get('/', expressAsyncHandler(this.getProducts.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateProduct.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteProduct.bind(this)))
  }

  async createProduct({ body, method }: Request<{}, {}, IProduct>, res: Response){
    try {
      const product = await this.service.create(body)

      this.send({
        response: res,
        data: product,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async getProducts({ query, method }: Request<{}, {}, {}, ProductQuery>, res: Response){
    try {
      const products = await this.service.read(query)

      this.send({
        response: res,
        data: products,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async updateProduct({ body, method }: Request<{}, {}, Partial<IProduct & Document>>, res: Response){
    try {
      const { updated } = await this.service.update(body)

      this.send({
        response: res,
        data: updated,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }

  async deleteProduct({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response){
    try {
      await this.service.delete(query.id)

      this.send({
        response: res,
        data: true,
        url: this.path,
        method
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }
}
