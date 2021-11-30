import dotenv from 'dotenv'
import path from 'path'
import { injectable } from 'inversify'
import { IConfig } from '@/types'

const root = path.join.bind(this, __dirname)

dotenv.config({
  path: root('../../../.env')
})

@injectable()
export class Config implements IConfig{
  port: number = Number(process.env.PORT!)
  dbUri: string = process.env.MONGO_URI!
  secret: string = process.env.SECRET_KEY!
}
