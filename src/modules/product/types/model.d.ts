import { RefType } from 'mongoose'
import { IAssetItem, IAttribute, ISEOType, IVariant } from '@/types/models'

export interface IProduct {
  name: string
  description: string
  price: number
  count: number
  unit: string
  image?: string
  url?: string
  isVisible: boolean
  categories: RefType[]
  seo?: ISEOType
  assets: IAssetItem[]
  variants: IVariant[]
  attributes: IAttribute[]
}
