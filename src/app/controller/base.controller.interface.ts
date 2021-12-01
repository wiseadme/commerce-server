import { Response } from 'express'

export interface IBaseController {
  send: (res: Response, method, payload: any, baseUrl: string) => void,
  error: (method: string, err: any, baseUrl: string) => Promise<any>
}
