import { Response } from 'express'

export interface IBaseController {
  send: (res: Response, payload: any) => void,
  handleError: (err: any) => Promise<any>
}
