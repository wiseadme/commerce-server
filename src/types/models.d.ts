import { Document, RefType } from 'mongoose'

interface IModelRef<T> {
  _id: string
  ref: Document<T>['modelName']
}

export interface ICategory {
  title: string
  image?: string
  seo?: ISEOType
  url?: string
  parent?: string
  order?: number
  children: string[]
}

export interface ISEOType {
  title: string
  description: string
  keywords: string
}

export interface IProductSEO extends ISEOType {

}

export interface IProduct {
  name: string
  description: string
  price: number
  image?: string
  url?: string
  categories: RefType[]
  seo?: IProductSEO
  assets: IAssetItem[]
  variants: IVariant[],
  attributes: IAttribute[]
}

interface IAttribute {
  meta: string
  name: string
  value: string
}

export interface IVariant {
  group: string,
  product: string
  options: any[]
}

export interface IVariantOptions {
  variantId: string
  name: string
  meta?: string
  price?: number
  quantity?: number
  sku?: string
  assets: string[]
}

export interface IAssetItem {
  url: string
  type: string,
  fileName: string,
  ownerId: string
}
