import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import { ILogger } from '@/types/utils';
import { IFileLoaderMiddleware } from '@/types/middlewares';

@injectable()
export class FilesController {
  path = '/v1/uploads';
  router = Router();

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
    this.initRoutes();
  }

  initRoutes(){
    this.router.post('/', this.uploadImage.bind(this));
  }

  uploadImage(req, res){
    const upload = this.fileLoader.loadSingle('image');

    upload(req, res, err => console.log(err));

    res.status(200).json({
      ok: true,
      status: 200
    });
  }
}
