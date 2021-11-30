import express, { Application } from 'express'
import { inject, injectable, multiInject } from 'inversify'
import { DB } from './db'
import { TYPES } from './schemes/di-types'
import { IConfig, IController } from '@/types'
import { IErrorRouteMiddleware, IMiddleware } from '@/types/middlewares'
import { ILogger } from '@/types/utils'

@injectable()
class App {
  public app: Application
  public port: number

  constructor(
    @inject(TYPES.DB) private db: DB,
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.CONFIG) private config: IConfig,
    @inject(TYPES.MIDDLEWARES.IErrorRouteMiddleware) private errorRouteMiddleware: IErrorRouteMiddleware,
    @multiInject(TYPES.CONTROLLERS.IController) private routesArray: IController[],
    @multiInject(TYPES.MIDDLEWARES.IMiddleware) private middlewaresArray: IMiddleware[],
  ) {
    this.app = express()
    this.port = this.config.port

    this.middleWares(middlewaresArray)
    this.routes(routesArray)
    this.db.connect()
  }

  // TODO - replace express middlewares with with middleware classes
  private middleWares(middleWares: Array<any>) {
    this.app.use(express.json({}))
    this.app.use(express.urlencoded({}))

    middleWares.forEach(middleWare => {
      this.app.use(middleWare.execute.bind(middleWare))
    })
  }

  private routes(controllers: Array<IController>) {
    controllers.forEach(controller => {
      this.app.use(controller.path, controller.router)
    })

    this.app.use(this.errorRouteMiddleware.execute as any)
  }

  public listen() {
    this.app.listen(this.port, () => this.logger.log('server is running on ', this.port))
  }
}

export default App
