import { Request, Response } from 'express'
import { IAssetItem } from './model'
import { AssetsResponse } from './params'

export interface IAssetsRepository {
  save(req: Request, res: Response): Promise<AssetsResponse>

  update(updates: Partial<IAssetItem>): Promise<{ updated: IAssetItem }>

  delete(id: string, fileName?: string): any
}
