import { Router, Request, Response } from 'express'

import expressAsyncHandler from 'express-async-handler'
import categoryService from '../services/category-service'

// Types
import { IController } from '../types'
import { ICategory } from '../types/models'

export class CategoryController implements IController {
  public path = '/category'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', expressAsyncHandler(this.getCategories))
    this.router.post('/', expressAsyncHandler(this.createCategory))
    this.router.patch('/', expressAsyncHandler(this.updateCategory))
    this.router.delete('/', expressAsyncHandler(this.deleteCategory))
  }

  async createCategory(req: Request, res: Response) {
    const { create } = categoryService
    const params: ICategory = req.body

    try {
      const category = await create(params)

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
    const { update } = categoryService
    const params: Partial<ICategory> = req.body

    try {
      const { updated } = await update(params)

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

  }

  async getCategories(req: Request, res: Response) {

  }
}

export default CategoryController



