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
  uploadsDir: string
}

export interface IDb {
  connect: () => any
  onConnect: () => void
  onError: () => void
  onClose: () => void
}
