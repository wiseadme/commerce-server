import { Consola, JSONReporter } from 'consola'
import { ILogger } from '../../types/utils'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
  public logger: Consola

  constructor() {
    this.logger = new Consola({
      reporters: [
        new JSONReporter({})
      ],
      defaults: {}
    })
  }

  log(...args: unknown[]) {
    // @ts-ignore
    this.logger.info(...args)
  }

  error(...args: unknown[]) {
    // @ts-ignore
    this.logger.error(...args)
  }

  warn(...args: unknown[]) {
    // @ts-ignore
    this.logger.warn(...args)
  }
}
