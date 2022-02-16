import mongoose, { MongooseOptions } from 'mongoose';
import { inject, injectable } from 'inversify';
import { TYPES } from '@common/schemes/di-types';
import { ILogger } from '@/types/utils';
import { IDb } from '@/types';
import config from '../config';


@injectable()
export class DB implements IDb {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
  ) {
  }

  connect() {
    mongoose.connect(config.dbUri, {
      useNewUrlParser: true,
    } as MongooseOptions);

    this.onConnect();
    this.onError();
    this.onClose();
  }

  onConnect() {
    mongoose.connection.once('open', () => {
      this.logger.log('connected to mongo');
    });
  }

  onError() {
    mongoose.connection.on('error', err => this.logger.error(err));
  }

  onClose() {
    mongoose.connection.on('close', () => this.logger.log('MongoDB connection is closed'));
  }
}
