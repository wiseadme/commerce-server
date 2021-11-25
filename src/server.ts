// Depends
import express from 'express'

// App
import App from './app'

// Db connector
import db from './db'

// Configs
import { config } from './config'

// Middlewares
import { loggerMiddleware } from './middlewares/logger-middleware'
import { errorMiddleware } from './middlewares/error-middleware'

// Controllers
import CategoryController from './controllers/CategoryController'

const app = new App({
  port: config.PORT,

  middleWares: [
    express.json({}),
    express.urlencoded({}),
    loggerMiddleware,
  ],

  controllers: [
    new CategoryController(),
    errorMiddleware
  ]
})

db.now()
app.listen()
