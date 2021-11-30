import { Errback, NextFunction, Request, Response } from 'express'

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void
}

export interface IErrorRouteMiddleware {
  execute: (err: Errback, req: Request, res: Response, next: NextFunction) => void
}
