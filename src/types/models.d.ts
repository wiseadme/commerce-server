import { Document } from 'mongoose'

interface IModelRef<T> {
  _id: Document<T>['_id']
  ref: Document<T>['modelName']
}

export interface ICategory {
  title: string
  image?: string
  seo?: ISEOType
  url?: string
  parent?: string
  order?: number
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
  categories: IModelRef<ICategory>[]
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
  product: IModelRef<IProduct>
  options: IModelRef<IVariantOptions>[]
}

export interface IVariantOptions {
  name: string
  meta?: string
  price?: number
  quantity?: number
  sku?: string
  assets: string[]
}

export interface IAssetItem {
  url: string
  type: string
}
