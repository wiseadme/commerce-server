import { Router, Request, Response } from 'express'

import expressAsyncHandler from 'express-async-handler'
import { injectable, inject } from 'inversify'

import { BaseController } from '@/app/controller/base.controller'

// Types
import { IController } from '@/types'
import { ICategory } from '@/types/models'
import { ILogger } from '@/types/utils'
import { ICategoryService } from '@/types/services'

// Schemes
import { TYPES } from '@/app/schemes/di-types'

@injectable()
export class CategoryController extends BaseController implements IController {
  public path = '/v1/category'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.ICategoryService) private service: ICategoryService,
  ) {
    super()
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', expressAsyncHandler(this.getCategories.bind(this)))
    this.router.post('/', expressAsyncHandler(this.createCategory.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateCategory.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteCategory.bind(this)))
  }

  async createCategory({ body, method }: Request, res: Response) {
    try {
      const category = await this.service.create(body as ICategory)
      this.send(res, method, category, this.path)
    } catch (err: any) {
      return this.error(method, err, this.path)
    }
  }

  async updateCategory({ body, method }: Request, res: Response) {
    try {
      const { updated } = await this.service.update(body as Partial<ICategory>)
      this.send(res, method, updated, this.path)
    } catch (err: any) {
      return this.error(method, err, this.path)
    }
  }

  async getCategories({ query, method }: Request, res: Response) {
    try {
      const categories = await this.service.read(query)
      this.send(res, method, categories, this.path)
    } catch (err: any) {
      return this.error(method, err, this.path)
    }
  }

  async deleteCategory(req: Request, res: Response) {
    console.log(req.body)
  }
}

export default CategoryController



