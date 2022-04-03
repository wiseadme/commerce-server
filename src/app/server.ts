import { Application } from 'express'
import { container } from '@common/dependencies'
import { TYPES } from '@common/schemes/di-types'

export const server: Application = container.get(TYPES.APPLICATION)
