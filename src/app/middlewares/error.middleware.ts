import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '../../types/utils'

@injectable()
export class ErrorHandler {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }

  handler(err, req, res, next) {
    res?.status(err.status).json(err)
  }
}
