import { json, urlencoded } from 'express'
import App from './app'
import db from './db'

import loggerMiddleware from './middlewares/logger-middleware'

import MainController from './controllers/MainController'

const app = new App({
  port: 5000,

  middleWares: [
    loggerMiddleware,
    json({}),
    urlencoded({})
  ],

  controllers: [
    new MainController
  ]
})
db.now()
app.listen()
