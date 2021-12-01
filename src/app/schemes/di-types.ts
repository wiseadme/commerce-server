export const TYPES = {
  APPLICATION: Symbol.for('App'),
  DB: Symbol.for('DB'),
  CONFIG: Symbol.for('CONFIG'),
  SERVICES: {
    ICategoryService: Symbol.for('ICategoryService')
  },
  CONTROLLERS: {
    IController: Symbol.for('IController'),
  },
  UTILS: {
    ILogger: Symbol.for('ILogger'),
  },
  ENTITIES: {
    CategoryEntity: Symbol.for('CategoryEntity')
  },
  REPOSITORIES: {
    CategoryRepository: Symbol.for('CategoryRepository')
  },
  MIDDLEWARES: {
    IMiddleware: Symbol.for('IMiddleware'),
    IErrorRouteMiddleware: Symbol.for('IErrorRouteMiddleware'),
  }
}
