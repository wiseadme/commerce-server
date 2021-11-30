import { Router } from 'express'

export interface IController {
  path: string
  router: Router
  initRoutes: () => void
}

export interface IConfig {
  port: number
  dbUri: string
  secret: string
}
