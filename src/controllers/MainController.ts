import { Router } from 'express'

class MainController {
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
    console.log(req.headers)
    res.status(200).json({
      ok: true,
      data: { user: 'Anar' }
    })
  }

  patch() {

  }
}

export default MainController
