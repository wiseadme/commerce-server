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
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createAttribute.bind(this)))
    this.router.get('/', expressAsyncHandler(this.getAttribute.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteAttribute.bind(this)))
    this.router.patch('/')
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

  async getAttribute({ query, method }: Request<{}, {}, {}, { id?: string }>, res: Response){
    try {
      const attributes = await this.service.read(query?.id)

      this.send({
        response: res,
        data: attributes,
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

  async deleteAttribute({ query, method, path }: Request, res: Response){
    try {
      await this.service.delete(query.id as string)

      this.send({
        response: res,
        data: null,
        url: this.path + path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path + path,
        method
      })
    }
  }
}
