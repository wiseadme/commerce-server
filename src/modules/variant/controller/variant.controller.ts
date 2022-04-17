import { Router, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import expressAsyncHandler from 'express-async-handler'

import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'

import { IController } from '@/types'
import { ILogger } from '@/types/utils'
import { IVariant } from '@/types/models'
import { IVariantService } from '@/types/services'

@injectable()
export class VariantController extends BaseController implements IController {
  public path = '/v1/variant'
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
  }

  async createVariant({ body, method }: Request<{}, {}, IVariant>, res: Response){
    try {
      const variant = await this.service.create(body)

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
}
