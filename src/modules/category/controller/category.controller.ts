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
  public path = '/category'
  public router = Router()

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.SERVICES.ICategoryService) private categoryService: ICategoryService,
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

  async createCategory({ body }: Request, res: Response, next) {
    try {
      const category = await this.categoryService.create(body as ICategory)
      this.send(res, category)
    } catch (err: any) {
      return this.error(500, err)
    }
  }

  async updateCategory({ body }: Request, res: Response) {
    try {
      const { updated } = await this.categoryService.update(body as Partial<ICategory>)
      this.send(res, updated)
    } catch (err: any) {
      return this.error(500, err)
    }
  }

  async getCategories({ query }: Request, res: Response) {
    try {
      const categories = await this.categoryService.read(query)
      this.send(res, categories)
    } catch (err: any) {
      return this.error(500, err)
    }
  }

  async deleteCategory(req: Request, res: Response) {
    console.log(req.body)
  }
}

export default CategoryController



