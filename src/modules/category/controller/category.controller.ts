import { Router, Request, Response } from 'express'

import expressAsyncHandler from 'express-async-handler'
import categoryService from '../service/category.service'
import 'reflect-metadata'

// Types
import { IController, ILogger } from '../../../types'
import { ICategory } from '../../../types/models'
import { ICategoryService } from '../../../types/services'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../schemes/di-types'

@injectable()
export class CategoryController implements IController {
  public path = '/category'
  public router = Router()

  constructor(
    @inject(TYPES.ILogger) public logger: ILogger,
    @inject(TYPES.ICategoryService) public categoryService: ICategoryService
  ) {
    this.logger.error('oh no!')
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', expressAsyncHandler(this.getCategories.bind(this)))
    this.router.post('/', expressAsyncHandler(this.createCategory.bind(this)))
    this.router.patch('/', expressAsyncHandler(this.updateCategory.bind(this)))
    this.router.delete('/', expressAsyncHandler(this.deleteCategory.bind(this)))
  }

  async createCategory(req: Request, res: Response) {
    const body: ICategory = req.body

    try {
      const category = await this.categoryService.create(body)

      res.status(201).json({
        ok: true,
        data: category
      })
    } catch (err: any) {
      return Promise.reject({
        ok: false,
        status: err.status || 501,
        message: err.message || err
      })
    }
  }

  async updateCategory(req: Request, res: Response) {
    const body: Partial<ICategory> = req.body

    try {
      const { updated } = await this.categoryService.update(body)

      res.status(201).json({
        ok: true,
        data: updated
      })
    } catch (err: any) {
      return Promise.reject({
        ok: false,
        status: err.status || 501,
        message: err.message || err
      })
    }
  }

  async deleteCategory(req: Request, res: Response) {
    console.log(req.body)
  }

  async getCategories(req: Request, res: Response) {
    const query = req.query

    try {
      const categories = await this.categoryService.read(query)

      res.status(200).json({
        ok: true,
        data: categories
      })
    } catch (err: any) {
      return Promise.reject({
        ok: false,
        status: err.status || 501,
        message: err.message || err
      })
    }
  }
}

export default CategoryController



