export declare type Maybe<T> = T | null

export type ProductQuery = {
  id?: string
  category?: string
  name?: string
  page?: number
  count?: number
}

export type VariantQuery = {
  productId: string
}
