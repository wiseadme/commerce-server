import * as fs from 'fs/promises'
import { IAssetsRepository, AssetsResponse } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IFileLoaderMiddleware } from '@/types/middlewares'
import { AssetModel } from '@modules/assets/model/asset.model'
import config from '@app/config'
import mongoose from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'
import { Request, Response } from 'express'

@injectable()
export class AssetsRepository implements IAssetsRepository {
  constructor(
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
  }

  save(req: Request, res: Response): Promise<AssetsResponse>{
    return new Promise((resolve, reject) => {
      const upload = this.fileLoader.loadSingle('image')

      const assetId = new mongoose.Types.ObjectId()

      const { fileName } = req.query

      const url = `/uploads/${ assetId.toString() }|${ fileName }`

      req.query.assetId = assetId.toString()

      try {
        upload(req, res, (err, filename) => {
          console.log(err, filename, 'in upload')
        })
      } catch(err) {
        reject(err)
      }

      new AssetModel({
        _id: assetId,
        ownerId: req.query.id,
        fileName,
        url
      })
        .save()
        .then(resolve)
    })
  }

  async delete(id: string, fileName?: string){
    console.log(id, fileName, 'in repo')
    try {
      validateId(id)
      const res = await AssetModel.find({ ownerId: id })

      res.forEach(it => {
        const file = fileName ? fileName : it._id + '|' + it.fileName
        fs.unlink(`${ config.uploadsDir }/${ file }`)
        it.deleteOne()
      })

      return true
    } catch (err) {
      console.log(err)
    }
  }
}
