import { Router } from 'express'
import { Consola } from 'consola'

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

export interface ILogger {
  logger: Consola
  log: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
}
