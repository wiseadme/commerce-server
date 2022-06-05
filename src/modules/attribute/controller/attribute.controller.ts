import expressAsyncHandler from 'express-async-handler'
import { BaseController } from '@common/controller/base.controller'
import { Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Document } from 'mongoose'
import { Request, Response } from 'express'
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAttributeService } from '../types/service'
import { IAttribute } from '../types/model'

@injectable()
export class AttributeController extends BaseController implements IController {
  public path = '/v1/attributes'
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
    this.router.patch('/', expressAsyncHandler(this.updateAttributes.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteAttribute.bind(this)))
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

  async updateAttributes({ body, method }: Request<{}, {}, Array<IAttribute & Document>>, res: Response){
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

  async deleteAttribute({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response){
    try {
      await this.service.delete(query.id)

      this.send({
        response: res,
        data: null,
        url: this.path,
        method
      })
    } catch (err: any) {
      return this.error({
        error: err,
        url: this.path,
        method
      })
    }
  }
}
