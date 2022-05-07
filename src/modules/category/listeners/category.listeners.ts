import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
import { IEmitterService, ICategoryEventListeners } from '@/types/listeners'
import { IAssetsService } from '@/types/services'

@injectable()
export class CategoryEventListeners implements ICategoryEventListeners {
  constructor(
    @inject(TYPES.SERVICES.IEmitterService) private emitter: IEmitterService,
    @inject(TYPES.SERVICES.IAssetsService) private assets: IAssetsService
  ){
  }

  onDelete(){
    this.emitter.on('delete:category', async (data) => {
      await this.assets.deleteFile(data.id)
    })
  }
}

