import express, { Errback, NextFunction, Request, Response } from 'express'

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void
}

export interface IErrorRouteMiddleware {
  execute: (err: Errback, req: Request, res: Response, next: NextFunction) => void
}

export interface IExpressMiddleware {
  execute: ReturnType<typeof express.json>
}
