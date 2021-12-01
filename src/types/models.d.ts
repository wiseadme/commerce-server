export interface ICategory {
  title: string
  image?: string
  seo?: SeoType
  order: number
}

export interface IJSONCategory {
  title: string
  image?: string
  seo?: string
  order: number
}

export type SeoType = {
  title: string
  description: string
  keywords: string
}
