export interface ISEOType {
  title: string
  description: string
  keywords: string
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
