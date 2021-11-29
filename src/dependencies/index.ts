import App from '../app'
import { ILogger } from '../types'
import { TYPES } from '../schemes/di-types'
import { LoggerService } from '../logger/logger.service'
import { Container } from 'inversify'
import { ICategoryService } from '../types/services'
import { CategoryService } from '../modules/category/service/category.service'
import { CategoryController } from '../modules/category/controller/category.controller'
import 'reflect-metadata'

export const container = new Container()

container.bind<App>(TYPES.App).to(App)
container.bind<ILogger>(TYPES.ILogger).to(LoggerService)
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService)
container.bind<CategoryController>(TYPES.CategoryController).to(CategoryController)
