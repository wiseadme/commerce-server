import express from 'express'
import { config } from './config'
import App from './app'
import db from './db'

import loggerMiddleware from './middlewares/logger-middleware'
import { errorMiddleware } from './middlewares/error-middleware'

import MainController from './controllers/MainController'
import CategoryController from './controllers/CategoryController'

const app = new App({
  port: config.PORT,

  middleWares: [
    express.json({
      type: 'application/json'
    }),
    express.urlencoded({}),
    loggerMiddleware,
  ],

  controllers: [
    new MainController(),
    new CategoryController(),
    errorMiddleware
  ]
})

db.now()
app.listen()
