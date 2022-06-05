import { RefType } from 'mongoose'
import { IAttribute } from '@modules/attribute/types/model'
import { IAssetItem } from '@modules/asset/types/model'
import { IVariant } from '@modules/variant/types/model'
import { ICategory } from '@modules/category/types/model'
import { IUnit } from '@modules/unit/types/model'
import { ISEOType } from '@/types/models'
import { Maybe } from '@/types/types'

export interface IProduct {
  name: string
  description: string
  price: number
  count: number
  image?: string
  url?: string
  isVisible: boolean
  seo?: ISEOType
  unit: Maybe<IUnit>
  categories: (ICategory & RefType)[]
  assets: (IAssetItem & RefType)[]
  variants: (IVariant & RefType)[]
  attributes: IAttribute[]
}
