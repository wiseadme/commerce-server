import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { IAssetsService } from '../types/service'
import { IAssetsRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'

@injectable()
export class AssetService implements IAssetsService {
  constructor(
    @inject(TYPES.REPOSITORIES.IAssetsRepository) private repository: IAssetsRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
    this.addEventListeners()
  }

  async saveFile(req, res){
    return await this.repository.save(req, res)
  }

  async updateFile(updates){
    return await this.repository.update(updates)
  }

  async deleteFile({ id, url }){
    return await this.repository.delete(id, url)
  }

  addEventListeners(){
    this.events.on('delete:category', this.deleteFile.bind(this))
    this.events.on('delete:product', this.deleteFile.bind(this))
    this.events.on('update:assets', this.updateFile.bind(this))
  }
}
