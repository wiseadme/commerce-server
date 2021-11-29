import { container } from './dependencies'
import { TYPES } from './schemes/di-types'
import { Application } from 'express'

export const server: Application = container.get(TYPES.APPLICATION)
