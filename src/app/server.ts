import { Application } from 'express'
import { container } from './dependencies'
import { TYPES } from './schemes/di-types'

export const server: Application = container.get(TYPES.APPLICATION)
