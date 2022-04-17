export const TYPES = {
  APPLICATION: Symbol.for('App'),
  DB: Symbol.for('DB'),
  CONFIG: Symbol.for('CONFIG'),
  SERVICES: {
    ICategoryService: Symbol.for('ICategoryService'),
    IProductService: Symbol.for('IProductService'),
    IFilesService: Symbol.for('IFilesService'),
    IVariantService: Symbol.for('IVariantService')
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
    FilesRepository: Symbol.for('FilesRepository'),
    VariantRepository: Symbol.for('VariantRepository')
  },
  MIDDLEWARES: {
    IMiddleware: Symbol.for('IMiddleware'),
    IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
    IFileLoaderMiddleware: Symbol.for('IFileLoaderMiddleware')
  }
}
