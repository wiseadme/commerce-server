import { Response } from 'express'
import { IBaseController } from './base.controller.interface'
import { injectable } from 'inversify'

@injectable()
export class BaseController implements IBaseController {
  send(res: Response, payload: any) {
    res.status(200).json({
      ok: true,
      data: payload
    })
  }

  error(status: number, err: any): Promise<any> {
    return Promise.reject({
      ok: false,
      status: err.status || status,
      message: err.message || err
    })
  }
}
