import { Router } from 'express'

export type Config = {
  PORT: number
  MONGO_URI: string
  SECRET: string
}

export interface IController {
  path: string
  router: Router
  initRoutes: () => void
}
