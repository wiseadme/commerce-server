import mongoose, { MongooseOptions } from 'mongoose'
import { config } from '../config'
import consola from 'consola'

const { isValidObjectId } = mongoose

export const connectDb = () => {
  mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
  } as MongooseOptions)

  mongoose.connection
    .on('error', err => consola.error(err))
    .on('close', () => consola.info('MongoDB connection is closed'))
    .once('open', () => {
      const info = mongoose.connections[0]
      consola.success('connected to mongo')
      consola.info(info)
    })

  return {
    mongoose,
    isValidObjectId
  }
}