import { Consola } from 'consola'

export interface ILogger {
  logger: Consola
  log: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  success: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
}
