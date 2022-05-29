import { IAssetsService, IEventBusService } from '@/types/services'
import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IAssetsRepository } from '@/types/repositories'

@injectable()
export class AssetService implements IAssetsService {
  constructor(
    @inject(TYPES.REPOSITORIES.AssetsRepository) private repository: IAssetsRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ) {
    this.addEventListeners()
  }

  async saveFile(req, res) {
    return await this.repository.save(req, res)
  }

  async deleteFile({ id, url }) {
    return await this.repository.delete(id, url)
  }

  addEventListeners() {
    this.events.on('delete:category', this.deleteFile.bind(this))
  }
}
