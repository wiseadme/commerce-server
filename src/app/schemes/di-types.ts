export const TYPES = {
  APPLICATION: Symbol.for('App'),
  DB: Symbol.for('DB'),
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
    IErrorMiddleware: Symbol.for('IErrorMiddleware')
  }
}
