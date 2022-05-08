import 'reflect-metadata'
import App from '@app/app'
import { DB } from '@app/db'
import { Config } from '@app/config'
import { TYPES } from '../schemes/di-types'
import { Container } from 'inversify'

// Services
import { LoggerService } from '../services/logger.service'
import { CategoryService } from '@modules/category/service/category.service'
import { ProductService } from '@modules/product/service/product.service'
import { VariantService } from '@modules/variant/service/variant.service'
import { AssetsService } from '@modules/assets/service/assets.service'
import { EventBusService } from '@common/services/event-bus.service'
// import {Variant}

// Controllers
import { CategoryController } from '@modules/category/controller/category.controller'
import { ProductController } from '@modules/product/controller/product.controller'
import { AssetsController } from '@modules/assets/controller/assets.controller'
import { SwaggerController } from '@swagger/controller/swagger.controller'

// Repositories
import { CategoryRepository } from '@modules/category/repository/category.repository'
import { ProductRepository } from '@modules/product/repository/product.repository'
import { VariantRepository } from '@modules/variant/repository/variant.repository'
import { AssetsRepository } from '@modules/assets/repository/assets.repository'

// Middlewares
import { JsonMiddleware } from '@common/middlewares/json.middleware'
import { UrlEncodedMiddleware } from '@common/middlewares/urlencoded.middleware'
import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { ErrorRouteMiddleware } from '../middlewares/error.route.middleware'
import { FileLoaderMiddleware } from '@common/middlewares/fileloader.middleware'

// Types
import {
  ICategoryService,
  IProductService,
  IAssetsService,
  IVariantService,
  ICategoryEventsService
} from '@/types/services'
import { ICategoryRepository, IAssetsRepository, IProductRepository, IVariantRepository } from '@/types/repositories'
import { ILogger } from '@/types/utils'
import { IController, IConfig, IDb } from '@/types'
import { IMiddleware, IErrorRouteMiddleware, IExpressMiddleware, IFileLoaderMiddleware } from '@/types/middlewares'
import { VariantController } from '@modules/variant/controller/variant.controller'
import { IEventBusService } from '@/types/services'


export const container = new Container({ skipBaseClassChecks: true })

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)
container.bind <IProductService>(TYPES.SERVICES.IProductService).to(ProductService)
container.bind<IAssetsService>(TYPES.SERVICES.IAssetsService).to(AssetsService)
container.bind<IVariantService>(TYPES.SERVICES.IVariantService).to(VariantService)
container.bind<IEventBusService>(TYPES.SERVICES.IEventBusService).to(EventBusService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SwaggerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(VariantController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AssetsController)

// Middlewares
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(JsonMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(UrlEncodedMiddleware)
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware)
container.bind<IErrorRouteMiddleware>(TYPES.MIDDLEWARES.IErrorRouteMiddleware).to(ErrorRouteMiddleware)
container.bind<IFileLoaderMiddleware>(TYPES.MIDDLEWARES.IFileLoaderMiddleware).to(FileLoaderMiddleware)

// Repositories
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.CategoryRepository).to(CategoryRepository)
container.bind<IProductRepository>(TYPES.REPOSITORIES.ProductRepository).to(ProductRepository)
container.bind<IAssetsRepository>(TYPES.REPOSITORIES.AssetsRepository).to(AssetsRepository)
container.bind<IVariantRepository>(TYPES.REPOSITORIES.VariantRepository).to(VariantRepository)
