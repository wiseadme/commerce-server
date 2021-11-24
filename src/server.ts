import express from 'express'
import { config } from './config'
import App from './app'
import db from './db'

import loggerMiddleware from './middlewares/logger-middleware'

import MainController from './controllers/MainController'

const app = new App({
  port: config.PORT,

  middleWares: [
    express.json({}),
    express.urlencoded({}),
    loggerMiddleware,
  ],

  controllers: [
    new MainController
  ]
})

db.now()
app.listen()
