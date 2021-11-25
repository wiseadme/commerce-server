import { Document } from 'mongoose'

export interface ICategory{
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
