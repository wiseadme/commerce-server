import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '@common/schemes/di-types'

// Types
import { ICategory } from '@/types/models'
import { ICategoryService } from '@/types/services'
import { ILogger } from '@/types/utils'
import { ICategoryRepository } from '@/types/repositories'

// Services
import { EmitterService } from '@common/services/emitter.service'

@injectable()
export class CategoryService extends EmitterService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.CategoryRepository) private repository: ICategoryRepository,
  ){
    super()
  }

  async create(category: ICategory){
    return await this.repository.create(Category.create(category))
  }

  async update(update: Partial<Document & ICategory>): Promise<{ updated: Document<ICategory> }>{
    return this.repository.update(Category.update(update))
  }

  async read<T extends Partial<Document & ICategory>>(query: T){
    return await this.repository.read(query)
  }

  async delete(id: string): Promise<boolean>{
    const res = await this.repository.delete(id)
    this.emitter.emit('delete:category', { id })
    return res
  }
}
