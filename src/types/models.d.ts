export interface ICategory {
  title: string
  image?: string
  seo?: ISEOType
  url?: string
  parent?: string
  order?: number
}

export interface IJSONCategory {
  title: string
  image?: string
  seo?: string
  parent?: string
  order: number
}

export interface ISEOType {
  title: string
  description: string
  keywords: string
}

export interface IProductSEO extends ISEOType{

}

export interface IProduct {
  name: string
  price: number
  image: string
  seo: IProductSEO
  assets: IAsset[] | []
  variants: IVariant[] | []
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

export interface IAsset {
  url: string
  type: string
}
