import { Response } from 'express'

export interface IBaseController {
  send: (res: Response, payload: any) => void,
  error: (status: number, err: any) => Promise<any>
}
