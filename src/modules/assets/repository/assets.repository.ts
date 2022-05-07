import * as fs from 'fs/promises'
import { IAssetsRepository, AssetsResponse } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IFileLoaderMiddleware } from '@/types/middlewares'
import { AssetModel } from '@modules/assets/model/asset.model'
import config from '@app/config'
import * as mongoose from 'mongoose'

@injectable()
export class AssetsRepository implements IAssetsRepository {
  constructor(
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
  }

  save(req, res): Promise<AssetsResponse>{
    return new Promise((resolve, reject) => {
      const upload = this.fileLoader.loadSingle('image')
      const timestamp = Date.now()
      const url = `/uploads/${ timestamp }|${ req.query.fileName }`

      req.query.timestamp = timestamp
      upload(req, res, err => reject(err))

      const asset = new AssetModel({
        _id: new mongoose.Types.ObjectId(),
        url
      })

      resolve({ url })
    })
  }

  async delete(fileName){
    try {
      await fs.unlink(`${ config.uploadsDir }/${ fileName }`)
      return true
    } catch (err) {
      return false
    }
  }
}
