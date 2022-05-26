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
      const ownerId = req.query.id as string
      const ownerDir = ownerId.slice(-4)

      const assetId = new mongoose.Types.ObjectId()

      const { fileName } = req.query

      const url = `/uploads/${ownerDir}/${ assetId.toString() }|${ fileName }`

      req.query.assetId = assetId.toString()
      req.query.ownerDir = ownerDir

      try {
        upload(req, res, (err, filename) => console.log(err, filename))
      } catch (err) {
        reject(err)
      }

      new AssetModel({
        _id: assetId,
        ownerId,
        fileName,
        url
      })
        .save()
        .then(resolve)
    })
  }

  async delete(id: string, url?: string){

    try {
      validateId(id)
      const res = await AssetModel.find({ ownerId: id })
      const ownerDir = id.slice(-4)

      res.forEach(it => {
        const file = url ? url.split('/')[3] : it._id + '|' + it.fileName

        fs.unlink(`${ config.uploadsDir }/${ownerDir}/${ file }`)
        it.deleteOne()
      })

      return true
    } catch (err) {
      console.log(err)
    }
  }
}
