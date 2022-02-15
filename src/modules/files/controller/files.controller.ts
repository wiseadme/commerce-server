import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import { ILogger } from '@/types/utils';
import { IFileLoaderMiddleware } from '@/types/middlewares';

@injectable()
export class FilesController {
  path = '/v1/assets';
  router = Router();

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.MIDDLEWARES.IFileLoaderMiddleware) private fileLoader: IFileLoaderMiddleware
  ){
    this.initRoutes();
  }

  initRoutes(){
    this.router.post('/', this.uploadImage.bind(this));
    this.router.delete('/', this.deleteImage.bind(this));
  }

  uploadImage(req: Request, res: Response){
    const upload = this.fileLoader.loadSingle('image');
    const timestamp = String(Date.now());

    req.query.timestamp = timestamp;

    upload(req, res, err => console.log(err));

    res.status(200).json({
      ok: true,
      status: 200,
      url: `/assets/${ timestamp }|${ req.query.fileName }`
    });
  }

  deleteImage(req: Request, res: Response){

  }
}
