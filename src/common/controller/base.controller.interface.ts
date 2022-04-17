import { SendOptions, ErrorOptions } from '@/types'

export interface IBaseController {
  send: (options: SendOptions) => void,
  error: (options: ErrorOptions) => Promise<any>
}
