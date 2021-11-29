// Depends
import express from 'express'

// App
import App from './app'

// Db connector
import { connectDb } from './db'

// Configs
import { config } from './config'

// Middlewares
import { loggerMiddleware } from './middlewares/logger-middleware'
import { errorMiddleware } from './middlewares/error-middleware'

// Services
import { LoggerService } from './logger/logger.service'

// Controllers
import CategoryController from './modules/category/controller/category.controller'
import { container } from './dependencies'
import { TYPES } from './schemes/di-types'

const { mongoose } = connectDb()

export const server = new App({
  logger: new LoggerService(),
  port: config.PORT,
  middleWares: [
    express.json({}),
    express.urlencoded({}),
    loggerMiddleware,
  ],
  controllers: [
    container.get(TYPES.CategoryController),
    errorMiddleware
  ]
})