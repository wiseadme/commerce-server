import { IAssetsService } from '@/types/services'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IAssetsRepository } from '@/types/repositories'

@injectable()
export class AssetsService implements IAssetsService {
  constructor(
    @inject(TYPES.REPOSITORIES.AssetsRepository) private repository: IAssetsRepository
  ){
  }

  async saveFile(req, res){
    return await this.repository.save(req, res)
  }

  async deleteFile(fileName){
    return await this.repository.delete(fileName)
  }

  async deleteAllFiles(id: string) {

  }
}
