import mongoose, { MongooseOptions } from 'mongoose'
import { config } from '../config'

const { isValidObjectId } = mongoose

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
} as MongooseOptions)

mongoose.connection
  .on('error', err => console.error(err))
  .on('close', () => console.log('MongoDB connection is closed'))
  .once('open', () => {
    const info = mongoose.connections[0]
    console.log('connected to mongo')
    console.log(info)
  })

export default mongoose

export {
  isValidObjectId
}