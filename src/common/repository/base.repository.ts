import mongoose from 'mongoose'
import { IBaseRepository } from '@/types/repositories'
import { injectable } from 'inversify'

@injectable()
export class BaseRepository implements IBaseRepository {
  validateId(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw ({ status: 409, message: 'object id is not valid' })
    }

    return true
  }
}
