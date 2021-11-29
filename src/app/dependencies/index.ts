import 'reflect-metadata'
import App from '../app'
import { TYPES } from '../schemes/di-types'
import { LoggerService } from '../logger/logger.service'
import { Container } from 'inversify'
import { CategoryService } from '../../modules/category/service/category.service'
import { CategoryController } from '../../modules/category/controller/category.controller'
import { CategoryRepository } from '../../modules/category/repository/category.repository'
import { DB } from '../db'
import { ICategoryService } from '../../types/services'
import { ICategoryRepository } from '../../types/repositories'
import { ILogger } from '../../types/utils'
import { IController } from '../../types'
import { IMiddleware, IErrorMiddleware } from '../../types/middlewares'
import { ErrorHandler } from '../middlewares/error.middleware'
import { LoggerMiddleware } from '../middlewares/logger.middleware'

export const container = new Container()

container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<DB>(TYPES.DB).to(DB)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)

// Middlewares
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware)
container.bind<IErrorMiddleware>(TYPES.MIDDLEWARES.IErrorMiddleware).to(ErrorHandler)

// Repositories
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.CategoryRepository).to(CategoryRepository)