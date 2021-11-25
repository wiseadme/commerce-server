import { Router, Request, Response } from 'express'
import { Controller } from '../types'
import { CategoryType } from '../types/models'
import expressAsyncHandler from 'express-async-handler'
import categoryService from '../services/category-service'

export class CategoryController implements Controller {
  public path = '/category'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.post('/create', expressAsyncHandler(this.createCategory))
  }

  async createCategory(req: Request, res: Response) {
    const { create } = categoryService
    const params: CategoryType = req.body

    try {
      const category = await create(params)

      res.status(200).json({
        ok: true,
        data: category
      })
    } catch (err: any) {
      return Promise.reject({
        ok: false,
        status: 501,
        message: err.message || err
      })
    }
  }
}

export default CategoryController
