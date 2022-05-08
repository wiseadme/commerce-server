import { ICategoryService } from '@/types/services'

export const TYPES = {
  APPLICATION: Symbol.for('App'),
  DB: Symbol.for('DB'),
  CONFIG: Symbol.for('CONFIG'),
  SERVICES: {
    ICategoryService: Symbol.for('ICategoryService'),
    IProductService: Symbol.for('IProductService'),
    IAssetsService: Symbol.for('IAssetsService'),
    IVariantService: Symbol.for('IVariantService'),
    IEventBusService: Symbol.for('IEventBusService')
  },
  CONTROLLERS: {
    IController: Symbol.for('IController'),
  },
  UTILS: {
    ILogger: Symbol.for('ILogger'),
  },
  ENTITIES: {
    CategoryEntity: Symbol.for('CategoryEntity'),
    ProductEntity: Symbol.for('ProductEntity')
  },
  REPOSITORIES: {
    CategoryRepository: Symbol.for('CategoryRepository'),
    ProductRepository: Symbol.for('ProductRepository'),
    AssetsRepository: Symbol.for('AssetsRepository'),
    VariantRepository: Symbol.for('VariantRepository')
  },
  MIDDLEWARES: {
    IMiddleware: Symbol.for('IMiddleware'),
    IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
    IFileLoaderMiddleware: Symbol.for('IFileLoaderMiddleware')
  }
}
