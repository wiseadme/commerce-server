import { CategoryController } from '../modules/category/controller/category.controller'

export const TYPES = {
  App: Symbol.for('App'),
  ILogger: Symbol.for('ILogger'),
  CategoryController: Symbol.for('CategoryController'),
  ICategoryService: Symbol.for('ICategoryService')
}