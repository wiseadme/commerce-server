import express from 'express'
import { IExpressMiddleware } from '@/types/middlewares'
import { injectable } from 'inversify'

@injectable()
export class JsonMiddleware implements IExpressMiddleware {
  execute: ReturnType<typeof express.json> = express.json({})
}
