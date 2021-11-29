import express from 'express'
import { Application } from 'express'
import { ILogger } from './types'

class App {
  public app: Application
  public port: number
  public logger: ILogger

  constructor(init: {
    port: number,
    middleWares: any[],
    controllers: any[],
    logger: ILogger
  }) {
    this.app = express()
    this.port = init.port
    this.logger = init.logger

    this.middleWares(init.middleWares)
    this.routes(init.controllers)
  }

  private middleWares(middleWares: Array<any>) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
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

  public listen() {
    this.app.listen(this.port, () => this.logger.log('server is running on ', this.port))
  }
}

export default App
