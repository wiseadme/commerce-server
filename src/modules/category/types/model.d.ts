import { ISEOType } from '@/types/models'

export interface ICategory {
  title: string
  image?: string
  seo?: ISEOType
  url?: string
  parent?: string
  order?: number
  children: string[]
  isVisible: boolean
}
