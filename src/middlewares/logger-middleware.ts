import { Request, Response } from 'express'
import consola from 'consola'

export const loggerMiddleware = (req: Request, resp: Response, next) => {

  consola.info('Request logged:', req.method, req.path)
  next()
}
