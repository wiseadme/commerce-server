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
  categories: string[] | []
  seo?: IProductSEO
  assets?: IAssetItem[]
  variants?: IVariant[]
}

export interface IVariant {
  group: string
  options: IVariantOptions[] | []
}

export interface IVariantOptions {
  price?: number
  quantity?: number
  sku?: string
  image?: string
}

export interface IAssetItem {
  url: string
  type: string
}
