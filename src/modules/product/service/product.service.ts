import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'

// Entity
import { Product } from '@modules/product/entity/product.entity'

// Types
import { ILogger } from '@/types/utils'
import { IProductRepository } from '@/types/repositories'
import { IEventBusService, IProductService } from '@/types/services'
import { IProduct } from '@/types/models'
import { Document } from 'mongoose'

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.REPOSITORIES.ProductRepository) private repository: IProductRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
  }

  async create(product: IProduct){
    return await this.repository.create(Product.create(product))
  }

  async read(query){
    const { id, category, name, page, count } = query
    const searchKey = name ? 'name' : category ? 'category' : null

    const params = id ? id : { page, count, [searchKey!]: query[searchKey!] }

    return await this.repository.read(params)
  }

  async update(updates: Partial<Document & IProduct>){
    if (updates.assets) updates.image = updates.assets?.find(it => it.main)?.url || ''
    return await this.repository.update(Product.update(updates))
  }

  async delete(id){
    const res = await this.repository.delete(id)
    this.events.emit('delete:product', { id })

    return res
  }
}
