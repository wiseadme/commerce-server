import { Document } from 'mongoose'
import { inject, injectable } from 'inversify'

// Entity
import { Category } from '../entity/category.entity'

// Schemes
import { TYPES } from '@common/schemes/di-types'

// Types
import { ICategory } from '../types/model'
import { ICategoryService } from '../types/service'
import { ICategoryRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'
import { ILogger } from '@/types/utils'

@injectable()
export class CategoryService implements ICategoryService {

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ICategoryRepository) private repository: ICategoryRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
  }

  async create(category: ICategory){
    const ctg = await this.repository.create(Category.create(category))

    if (category.parent) {
      const [ parent ] = await this.repository.read({ id: category.parent })
      const children = [ ...parent!.children, ctg._id ]

      const $set = { _id: parent._id, children }

      await this.repository.update($set)
    }

    return ctg
  }

  async update(update: Partial<Document & ICategory>): Promise<{ updated: Document<ICategory> }>{
    const [ category ] = await this.repository.read({ id: update._id })

    if (update.parent) {

      if (category.parent) {
        const [ prevParent ] = await this.repository.read({ id: category.parent })

        const children = prevParent!.children.filter((it) => {
          return (it as any)._id.toString() !== update._id
        })

        const $set = { _id: prevParent._id, children }

        await this.repository.update($set)
      }

      const [ currentParent ] = await this.repository.read({ id: update.parent })
      const $set = { children: [ ...currentParent!.children, category!._id ], _id: currentParent._id }

      await this.repository.update($set)
    }

    return this.repository.update(Category.update(update))
  }

  read<T extends Partial<Document & ICategory>>(query: T){
    return this.repository.read(query)
  }

  async delete(id: string): Promise<boolean>{
    const [ category ] = await this.repository.read({ id })
    const res = await this.repository.delete(id)

    if (category.parent) {
      const [ parent ] = await this.repository.read({ id: category.parent })

      // here we add the "any" type to
      // children, because they are populated
      const children = parent!.children.filter((it) => {
        return (it as any)._id.toString() !== category._id
      })

      const $set = { _id: parent._id, children }

      await this.repository.update($set)
    }

    this.events.emit('delete:category', { id })

    return res
  }
}
