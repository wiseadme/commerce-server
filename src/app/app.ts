import express from 'express'
import { Application } from 'express'
import { ILogger } from '../types/utils'
import { DB } from './db'
import { inject, injectable, multiInject } from 'inversify'
import { TYPES } from './schemes/di-types'
import { IErrorMiddleware, IMiddleware } from '../types/middlewares'

@injectable()
class App {
  public app: Application
  public port: number

  constructor(
    @inject(TYPES.UTILS.ILogger) private logger: ILogger,
    @inject(TYPES.DB) private db: DB,
    @inject(TYPES.MIDDLEWARES.IErrorMiddleware) private errorHandler: IErrorMiddleware,
    @multiInject(TYPES.CONTROLLERS.IController) private routesArray: any[],
    @multiInject(TYPES.MIDDLEWARES.IMiddleware) private middlewaresArray: IMiddleware[],
  ) {
    this.app = express()
    this.port = 5000

    this.middleWares(middlewaresArray)
    this.routes(routesArray)
    this.handlers()
    this.db.connect()
  }

  private middleWares(middleWares: Array<any>) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare.handler.bind(middleWare))
    })
  }

  private routes(controllers: Array<any>) {
    controllers.forEach(controller => {
      if (typeof controller === 'function') {
        this.app.use(controller)
      } else {
        this.app.use(controller.path, controller.router)
      }
    })
  }

  private handlers() {
    this.app.use(this.errorHandler.handler as any)
  }

  public listen() {
    this.app.listen(this.port, () => this.logger.log('server is running on ', this.port))
  }
}

export default App