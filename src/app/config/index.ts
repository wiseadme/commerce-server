import dotenv from 'dotenv'
import path from 'path'
import { injectable } from 'inversify'
import { IConfig } from '@/types'

const root = path.join.bind(this, __dirname)

dotenv.config({
  path: root('../../../.env')
})

@injectable()
export class Config implements IConfig {
  port = Number(process.env.PORT!)
  dbUri = process.env.MONGO_URI!
  secret = process.env.SECRET_KEY!
  uploadsDir = process.env.UPLOADS_DIR!
}
