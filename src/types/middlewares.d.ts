import express, { Errback, NextFunction, Request, Response } from 'express'

export interface IMiddleware {
  handler: (req: Request, res: Response, next: NextFunction) => void
}

export interface IErrorRouteMiddleware {
  handler: (err: Errback, req: Request, res: Response, next: NextFunction) => void
}

export interface IExpressMiddleware {
  handler: ReturnType<typeof express.json>
}
