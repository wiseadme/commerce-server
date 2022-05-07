import * as fs from 'fs/promises'
import { IAssetsRepository, AssetsResponse } from '@/types/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IFileLoaderMiddleware } from '@/types/middlewares'
import { AssetModel } from '@modules/assets/model/asset.model'
import config from '@app/config'
import mongoose from 'mongoose'
import { validateId } from '@common/utils/mongoose-validate-id'

@injectable()
export class AssetsRepository implements IAssetsRepository {
  constructor(
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
  }

  save(req, res): Promise<AssetsResponse>{
    return new Promise((resolve, reject) => {
      const upload = this.fileLoader.loadSingle('image')

      const assetId = new mongoose.Types.ObjectId()

      const { fileName } = req.query

      console.log(req.query, 'assets repository query')

      const url = `/uploads/${ assetId.toString() }|${ fileName }`

      req.query.assetId = assetId.toString()
      upload(req, res, err => reject(err))

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

  async delete(id){
    try {
      validateId(id)
      const res = await AssetModel.find({ ownerId: id })

      res.forEach(it =>{
        fs.unlink(`${ config.uploadsDir }/${ it._id }|${ it.fileName }`)
        it.deleteOne()
      })

      return true
    } catch (err) {
      await fs.unlink(`${ config.uploadsDir }/${ id }`)
      return true
    }
  }
}
