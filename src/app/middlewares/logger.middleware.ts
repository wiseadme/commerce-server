import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '../../types/utils'


@injectable()
export class LoggerMiddleware {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  handler(err, req, res, next) {
    this.logger.log('Request logged:', req.method, req.path)
    next()
  }
}
