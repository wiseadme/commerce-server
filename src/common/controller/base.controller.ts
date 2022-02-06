import { Response } from 'express';
import { IBaseController } from './base.controller.interface';
import { injectable, decorate } from 'inversify';
import { LoggerService } from '@/common/services/logger/logger.service';

@injectable()
export abstract class BaseController implements IBaseController {
  static logger = new LoggerService();

  send(res: Response, method: string, payload: any, baseUrl: string){
    BaseController.logger.success('response:', method, 200, baseUrl, 'success');
    res.status(200).json({
      ok: true,
      data: payload
    });
  }

  error(method: string, err: any, baseUrl: string): Promise<any>{
    BaseController.logger.error(
      err.status || 500,
      method,
      baseUrl,
      err.message || err
    );

    return Promise.reject({
      ok: false,
      status: err.status || 500,
      message: err.message || err
    });
  }
}
