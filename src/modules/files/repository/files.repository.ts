import * as fs from 'fs/promises';

import { IFilesRepository, FileResponse } from '@/types/repositories';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import { IFileLoaderMiddleware } from '@/types/middlewares';
import config from '@/app/config';

@injectable()
export class FilesRepository implements IFilesRepository {
  constructor(
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
  }

  save(req, res): Promise<FileResponse>{
    return new Promise((resolve, reject) => {
      const upload = this.fileLoader.loadSingle('image');
      const timestamp = Date.now();

      req.query.timestamp = timestamp;
      upload(req, res, err => reject(err));

      resolve({ url: `/assets/${ timestamp }|${ req.query.fileName }` });
    });
  }

  async delete(fileName){
    try {
      await fs.unlink(`${ config.uploadsDir }/${ fileName }`);
      return true;
    } catch (err) {
      return false;
    }
  }
}
