import { inject, injectable } from 'inversify';
import { IMiddleware } from '@/types/middlewares';
import { TYPES } from '@/common/schemes/di-types';
import { ILogger } from '@/types/utils';

@injectable()
export class SwaggerMiddleware implements IMiddleware {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger
  ) {
  }
  execute(req, res, next) {
    this.logger.info('request:', req.method, req.path)
    next()
  }
}
