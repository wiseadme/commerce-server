import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '@/types/utils'
import { IMiddleware } from '@/types/middlewares'


@injectable()
export class LoggerMiddleware implements IMiddleware{
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  execute(req, res, next) {
    this.logger.info('request:', req.method, req.path)
    next()
  }
}
