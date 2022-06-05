import { Router } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'

import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import { Variant } from '../entity/variant.entity'
// Types
import { Request, Response } from 'express'
import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { IVariant } from '../types/model'
import { IVariantService } from '../types/service'
import { VariantQuery } from '../types/params'

@injectable()
export class VariantController extends BaseController implements IController {
  public path = '/v1/variants'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IVariantService) private service: IVariantService
  ){
    super()
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createVariant.bind(this)))
    this.router.get('/', expressAsyncHandler(this.getVariants.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateVariant.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteVariant.bind(this)))
  }

  async createVariant({ body, method }: Request<{}, {}, IVariant>, res: Response){
    try {
      const variant = await this.service.create(Variant.create(body))

      this.send({
        response: res,
        data: variant,
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

  async getVariants({ query, method }: Request<{}, {}, {}, VariantQuery>, res: Response){
    try {
      const variants = await this.service.read(query.productId)

      this.send({
        response: res,
        data: variants,
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

  async updateVariant({ body, method }: Request<{}, {}, Partial<IVariant>>, res: Response){
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

  async deleteVariant({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response){
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
