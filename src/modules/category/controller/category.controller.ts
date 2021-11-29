import { Router, Request, Response } from 'express'

import expressAsyncHandler from 'express-async-handler'
import categoryService from '../service/category.service'

// Types
import { IController } from '../../../types'
import { ICategory } from '../../../types/models'

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
    const body: ICategory = req.body

    try {
      const category = await create(body)

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
    const body: Partial<ICategory> = req.body

    try {
      const { updated } = await update(body)

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
    const { read } = categoryService

    try {
      const categories = await read(query)

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



