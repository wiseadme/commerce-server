import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '@/types/utils'

@injectable()
export class ErrorRouteMiddleware {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  execute(err, req, res, next) {
    res?.status(err.status).json(err)
  }
}
