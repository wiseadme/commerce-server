import { Consola, FancyReporter } from 'consola'
import { ILogger } from '@/types/utils'
import { injectable } from 'inversify'

@injectable()
export class LoggerService implements ILogger {
  public logger: Consola

  static setDate: () => string = () => new Date().toISOString()

  constructor() {
    this.logger = new Consola({
      reporters: [
        new FancyReporter({})
      ],
      defaults: {}
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args as [], LoggerService.setDate())
  }

  info(...args: unknown[]) {
    this.logger.info(...args as [], LoggerService.setDate())
  }

  success(...args: unknown[]) {
    this.logger.success(...args as [], LoggerService.setDate())
  }

  error(...args: unknown[]) {
    this.logger.error(...args as [], LoggerService.setDate())
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args as [], LoggerService.setDate())
  }
}
