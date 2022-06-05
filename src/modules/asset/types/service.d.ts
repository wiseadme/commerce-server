import { Request, Response } from 'express'
import { IAssetItem } from './model'

export interface IAssetsService {
  saveFile(req: Request, res: Response): Promise<{ url: string }>

  updateFile(updates: Partial<IAssetItem>): Promise<{ updated: IAssetItem }>

  deleteFile(params: { id: string, url: string }): Promise<boolean>
}
