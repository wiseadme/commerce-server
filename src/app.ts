import express from 'express'
import { Application } from 'express'

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number, middleWares: any, controllers: any }) {
    this.app = express()
    this.port = appInit.port

    this.middleWares(appInit.middleWares)
    this.routes(appInit.controllers)
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
    this.app.listen(this.port, () => console.log('server is running on ' + this.port))
  }
}

export default App
