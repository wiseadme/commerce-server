import 'reflect-metadata'
import App from '@app/app'
import { DB } from '@app/db'
import { Config } from '@app/config'
import { TYPES } from '../schemes/di-types'
import { Container } from 'inversify'

// Controllers
import { CategoryController } from '@modules/category/controller/category.controller'
import { ProductController } from '@modules/product/controller/product.controller'
import { AssetController } from '@modules/asset/controller/asset.controller'
import { AttributeController } from '@modules/attribute/controller/attribute.controller'
import { SwaggerController } from '@swagger/controller/swagger.controller'
import { VariantController } from '@modules/variant/controller/variant.controller'
import { UnitController } from '@modules/unit/controller/unit.controller'

// Services
import { LoggerService } from '../services/logger.service'
import { CategoryService } from '@modules/category/service/category.service'
import { ProductService } from '@modules/product/service/product.service'
import { VariantService } from '@modules/variant/service/variant.service'
import { AssetService } from '@modules/asset/service/asset.service'
import { AttributeService } from '@modules/attribute/service/attribute.service'
import { UnitService } from '@modules/unit/service/unit.service'
import { EventBusService } from '@common/services/event-bus.service'

// Repositories
import { CategoryRepository } from '@modules/category/repository/category.repository'
import { ProductRepository } from '@modules/product/repository/product.repository'
import { VariantRepository } from '@modules/variant/repository/variant.repository'
import { AssetRepository } from '@modules/asset/repository/asset.repository'
import { AttributeRepository } from '@modules/attribute/repository/attribute.repository'
import { UnitRepository } from '@modules/unit/repository/unit.repository'

// Middlewares
import { JsonMiddleware } from '@common/middlewares/json.middleware'
import { UrlEncodedMiddleware } from '@common/middlewares/urlencoded.middleware'
import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { ErrorRouteMiddleware } from '../middlewares/error.route.middleware'
import { FileLoaderMiddleware } from '@common/middlewares/fileloader.middleware'

// Types
import { ICategoryService } from '@modules/category/types/service'
import { IProductService } from '@modules/product/types/service'
import { IAssetsService } from '@modules/asset/types/service'
import { IVariantService } from '@modules/variant/types/service'
import { IAttributeService } from '@modules/attribute/types/service'
import { IUnitService } from '@modules/unit/types/service'
import { IEventBusService } from '@/types/services'

import { ICategoryRepository } from '@modules/category/types/repository'
import { IAssetsRepository } from '@modules/asset/types/repository'
import { IProductRepository } from '@modules/product/types/repository'
import { IVariantRepository } from '@modules/variant/types/repository'
import { IAttributeRepository } from '@modules/attribute/types/repository'
import { IUnitRepository } from '@modules/unit/types/repository'

import { ILogger } from '@/types/utils'
import { IController, IConfig, IDb } from '@/types'
import { IMiddleware, IErrorRouteMiddleware, IExpressMiddleware, IFileLoaderMiddleware } from '@/types/middlewares'

export const container = new Container({ skipBaseClassChecks: true })

// Globals
container.bind<App>(TYPES.APPLICATION).to(App)
container.bind<IDb>(TYPES.DB).to(DB)
container.bind<IConfig>(TYPES.CONFIG).to(Config)

// Utils
container.bind<ILogger>(TYPES.UTILS.ILogger).to(LoggerService)

// Services
container.bind<ICategoryService>(TYPES.SERVICES.ICategoryService).to(CategoryService)
container.bind<IProductService>(TYPES.SERVICES.IProductService).to(ProductService)
container.bind<IAssetsService>(TYPES.SERVICES.IAssetsService).to(AssetService)
container.bind<IVariantService>(TYPES.SERVICES.IVariantService).to(VariantService)
container.bind<IAttributeService>(TYPES.SERVICES.IAttributeService).to(AttributeService)
container.bind<IEventBusService>(TYPES.SERVICES.IEventBusService).to(EventBusService)
container.bind<IUnitService>(TYPES.SERVICES.IUnitService).to(UnitService)

// Controllers
container.bind<IController>(TYPES.CONTROLLERS.IController).to(SwaggerController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(CategoryController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(ProductController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(VariantController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AttributeController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(AssetController)
container.bind<IController>(TYPES.CONTROLLERS.IController).to(UnitController)

// Middlewares
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(JsonMiddleware)
container.bind<IExpressMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(UrlEncodedMiddleware)
container.bind<IMiddleware>(TYPES.MIDDLEWARES.IMiddleware).to(LoggerMiddleware)
container.bind<IErrorRouteMiddleware>(TYPES.MIDDLEWARES.IErrorRouteMiddleware).to(ErrorRouteMiddleware)
container.bind<IFileLoaderMiddleware>(TYPES.MIDDLEWARES.IFileLoaderMiddleware).to(FileLoaderMiddleware)

// Repositories
container.bind<ICategoryRepository>(TYPES.REPOSITORIES.ICategoryRepository).to(CategoryRepository)
container.bind<IProductRepository>(TYPES.REPOSITORIES.IProductRepository).to(ProductRepository)
container.bind<IAssetsRepository>(TYPES.REPOSITORIES.IAssetsRepository).to(AssetRepository)
container.bind<IAttributeRepository>(TYPES.REPOSITORIES.IAttributeRepository).to(AttributeRepository)
container.bind<IVariantRepository>(TYPES.REPOSITORIES.IVariantRepository).to(VariantRepository)
container.bind<IUnitRepository>(TYPES.REPOSITORIES.IUnitRepository).to(UnitRepository)
