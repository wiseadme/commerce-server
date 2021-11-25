import { Document } from 'mongoose'

export interface CategoryType{
  title: string
  image?: string
  seo?: SeoType
  order: number
}

export type SeoType = {
  title: string
  description: string
  keywords: string
}
