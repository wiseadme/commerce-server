import mongoose, { MongooseOptions } from 'mongoose'
import { config } from '../config'
import { inject, injectable } from 'inversify'
import { TYPES } from '../schemes/di-types'
import { ILogger } from '../../types/utils'

const { isValidObjectId } = mongoose

@injectable()
export class DB {
  constructor(@inject(TYPES.UTILS.ILogger) private logger: ILogger) {
  }

  connect() {
    mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
    } as MongooseOptions)

    this.onConnect()
    this.onError()
    this.onClose()

    return {
      mongoose,
      isValidObjectId
    }
  }

  onConnect() {
    mongoose.connection.once('open', () => {
      this.logger.log('connected to mongo')
    })
  }

  onError() {
    mongoose.connection.on('error', err => this.logger.error(err))
  }

  onClose() {
    mongoose.connection.on('close', () => this.logger.log('MongoDB connection is closed'))
  }
}
