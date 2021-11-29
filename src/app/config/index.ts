import dotenv from 'dotenv'
import path from 'path'
import { Config } from '../../types'

const root = path.join.bind(this, __dirname)

dotenv.config({
  path: root('../../../.env')
})

export const config: Config = {
  PORT: Number(process.env.PORT!),
  MONGO_URI: process.env.MONGO_URI!,
  SECRET: process.env.SECRET_KEY!
}
