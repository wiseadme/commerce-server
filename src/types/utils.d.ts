import { Consola } from 'consola'

export interface ILogger {
  logger: Consola
  log: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
}
