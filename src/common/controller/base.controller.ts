import { Response } from 'express'
import { IBaseController } from './base.controller.interface'
import { injectable } from 'inversify'
import { LoggerService } from '@common/services/logger.service'
import { ErrorOptions, SendOptions } from '@/types'

@injectable()
export abstract class BaseController implements IBaseController {
  static logger = new LoggerService()

  send({ response, data, method, url }: SendOptions){
    BaseController.logger.success('response:', method, 200, url, 'success')
    response.status(200).json({
      ok: true,
      data
    })
  }

  error({ method, error, url }: ErrorOptions){
    BaseController.logger.error(
      error?.status || 500,
      method,
      url,
      error?.message || error
    )

    return Promise.reject({
      ok: false,
      status: error?.status || 500,
      message: error?.message || error
    })
  }
}
