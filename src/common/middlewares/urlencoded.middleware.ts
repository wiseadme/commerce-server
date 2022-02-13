import express from 'express'
import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class UrlEncodedMiddleware implements IExpressMiddleware {
  execute: ReturnType<typeof express.urlencoded> = express.urlencoded({ extended: true })
}
