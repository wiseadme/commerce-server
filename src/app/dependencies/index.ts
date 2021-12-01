import 'reflect-metadata'
import App from '../app'
import { TYPES } from '../schemes/di-types'
import { LoggerService } from '../services/logger/logger.service'
import { Container } from 'inversify'
import { CategoryService } from '@/modules/category/service/category.service'
import { CategoryController } from '@/modules/category/controller/category.controller'
import { CategoryRepository } from '@/modules/category/repository/category.repository'
import { DB } from '../db'
import { Config } from '../config'
// Middlewares
import { JsonMiddleware } from '@/app/middlewares/json.middleware'
import { UrlEncodedMiddleware } from '@/app/middlewares/urlencoded.middleware'
import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { ErrorRouteMiddleware } from '../middlewares/error.route.middleware'
// Types
import { ICategoryService } from '@/types/services'
import { ICategoryRepository } from '@/types/repositories'
import { ILogger } from '@/types/utils'
import { IController, IConfig, IDb } from '@/types'
import { IMiddleware, IErrorRouteMiddleware, IExpressMiddleware } from '@/types/middlewares'

export const container = new Container()

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)

// Middlewares
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(JsonMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(UrlEncodedMiddleware)
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware)
container.bind<IErrorRouteMiddleware>(TYPES.MIDDLEWARES.IErrorRouteMiddleware).to(ErrorRouteMiddleware)

// Repositories
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.CategoryRepository).to(CategoryRepository)
