import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { Request, Response } from 'express'
import { ILogger } from '@/types/utils'
import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { IUnit } from '../types/model'
import { IUnitService } from '@modules/unit/types/service'

@injectable()
export class UnitController extends BaseController implements IController {
  path = '/v1/units'
  router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IUnitService) private service: IUnitService
  ){
    super()
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', expressAsyncHandler(this.createUnit.bind(this)))
    this.router.get('/', expressAsyncHandler(this.getUnits.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteUnit.bind(this)))
  }

  async createUnit({ body, method }: Request<{}, {}, IUnit>, res: Response){
    try {
      const unit = await this.service.create(body)
      this.send({
        response: res,
        data: unit,
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

  async getUnits({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response){
    try {
      const units = await this.service.read(query?.id)

      this.send({
        response: res,
        data: units,
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

  async deleteUnit({ query, method }: Request<{}, {}, {}, { id: string }>, res: Response){
    try {
      await this.service.delete(query.id)

      this.send({
        response: res,
        data: null,
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
