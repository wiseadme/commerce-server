import { IFilesService } from '@/types/services';
import { inject, injectable } from 'inversify';
import { TYPES } from '@common/schemes/di-types';
import { IFilesRepository } from '@/types/repositories';

@injectable()
export class FilesService implements IFilesService {
  constructor(
    @inject(TYPES.REPOSITORIES.FilesRepository) private repository: IFilesRepository
  ){
  }

  async saveFile(req, res){
    return await this.repository.save(req, res);
  }

  async deleteFile(fileName){
    return await this.repository.delete(fileName)
  }
}
