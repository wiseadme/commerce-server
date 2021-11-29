import { Errback, NextFunction } from 'express'

export interface IMiddleware {

}

export interface IErrorMiddleware {
  handler: (err: Errback, req: Request, res: Response, next: NextFunction) => void
}
