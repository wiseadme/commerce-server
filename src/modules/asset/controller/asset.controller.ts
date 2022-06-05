import { Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { BaseController } from '@common/controller/base.controller'
import expressAsyncHandler from 'express-async-handler'
// Types
import { ILogger } from '@/types/utils'
import { IController } from '@/types'
import { IAssetsService } from '../types/service'
import { IAssetItem } from '../types/model'
import { Document } from 'mongoose'

@injectable()
export class AssetController extends BaseController implements IController {
  path = '/v1/assets'
  router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IAssetsService) private service: IAssetsService
  ){
    super()
    this.initRoutes()
  }

  initRoutes(){
    this.router.post('/', expressAsyncHandler(this.uploadImage.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteImage.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateImage.bind(this)))
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

  async updateImage({ body, method }: Request<{}, {}, Partial<IAssetItem & Document>>, res: Response) {
    try {
      const { updated } = await this.service.updateFile(body)

      this.send({
        response: res,
        data: updated,
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

  async deleteImage({ body, query, method }: Request<{}, {}, {}, { id: string, url: string }>, res: Response){
    try {
      const result = await this.service.deleteFile(query)

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
