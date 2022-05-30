import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'
import { IAttributeService } from '@/types/services'
import { IAttribute } from '@/types/models'

@injectable()
export class AttributeController extends BaseController implements IController {
  public path = '/v1/attribute'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IAttributeService) private service: IAttributeService
  ){
    super()
  }

  initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createAttribute.bind(this)))
    this.router.get('/')
    this.router.patch('/')
    this.router.delete('/')
  }

  async createAttribute({ body, method }: Request<{}, {}, IAttribute>, res: Response){
    try {
      const attribute = await this.service.create(body)

      this.send({
        response: res,
        data: attribute,
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
