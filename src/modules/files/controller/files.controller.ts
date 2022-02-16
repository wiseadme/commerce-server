import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '@/common/schemes/di-types';
import { ILogger } from '@/types/utils';
import { IController } from '@/types';
import { BaseController } from '@/common/controller/base.controller';
import { IFilesService } from '@/types/services';

@injectable()
export class FilesController extends BaseController implements IController {
  path = '/v1/assets';
  router = Router();

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.IFilesService) private service: IFilesService
  ){
    super();
    this.initRoutes();
  }

  initRoutes(){
    this.router.post('/', this.uploadImage.bind(this));
    this.router.delete('/:filename', this.deleteImage.bind(this));
  }

  async uploadImage(req: Request, res: Response){
    try {
      const data = await this.service.saveFile(req, res);
      this.send(res, req.method, data, this.path);
    } catch (err) {
      this.error(req.method, err, this.path);
    }
  }

  async deleteImage({ params, method }: Request, res: Response){
    try {
      const result = await this.service.deleteFile(params.filename);
      this.send(res, method, result, this.path);
    } catch (err) {
      this.error(method, err, this.path);
    }
  }
}
