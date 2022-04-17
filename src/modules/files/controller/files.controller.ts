import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IFilesService } from '@/types/services'

@injectable()
export class FilesController extends BaseController implements IController {
  path = '/v1/assets'
  router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IFilesService) private service: IFilesService
  ){
    super()
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', this.uploadImage.bind(this))
    this.router.delete('/:filename', this.deleteImage.bind(this))
  }

  async uploadImage(req: Request, res: Response){
    try {
      const data = await this.service.saveFile(req, res)

      this.send({
        response: res,
        url: this.path,
        method: req.method,
        data
      })
    } catch (err) {
      return this.error({
        error: err,
        url: this.path,
        method: req.method
      })
    }
  }

  async deleteImage({ params, method }: Request, res: Response){
    try {
      const result = await this.service.deleteFile(params.filename)

      this.send({
        response: res,
        data: result,
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
