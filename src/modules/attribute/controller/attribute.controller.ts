import { BaseController } from '@common/controller/base.controller'
import { IController } from '@/types'
import { Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { ILogger } from '@/types/utils'

@injectable()
export class AttributeController extends BaseController implements IController {
  public path = '/v1/attribute'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
  ){
    super()
  }

  initRoutes(){
    this.router.post('/')
    this.router.get('/')
    this.router.patch('/')
    this.router.delete('/')
  }
}
