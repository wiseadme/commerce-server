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

  handleError(err): Promise<any> {
    return Promise.reject({
      ok: false,
      status: err.status || 501,
      message: err.message || err
    })
  }
}
