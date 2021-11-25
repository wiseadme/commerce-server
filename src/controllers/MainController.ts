import { Router } from 'express'
import { Controller } from '../types'

class MainController implements Controller {
  public path = '/'
  public router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get(this.path, this.authUser)
    this.router.get(this.path + 'create', this.getUser)
  }

  authUser(req, res) {
    console.log(req.headers)
    res.send('Hello from App')
  }

  getUser(req, res) {
    res.status(200).json({
      ok: true,
      data: { user: 'Anar' }
    })
  }
}

export default MainController
