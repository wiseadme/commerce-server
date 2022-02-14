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

export interface IFileLoaderMiddleware {
  loadSingle: (fieldName: string) => any
  loadArray: (fieldName: string, count: number) => any
}
