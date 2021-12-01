import { ICategory, SeoType } from '@/types/models'
import { translator } from '@/common/utils/translator'

export class Category {
  private readonly _url: string
  private readonly _title: string
  private readonly _order: number
  private readonly _seo?: SeoType
  private readonly _image?: string

  constructor({ title, seo, order, image }: ICategory) {
    this._title = title
    this._seo = seo
    this._order = order
    this._image = image
    this._url = this.setUrl(this._title)
  }

  get title(): string {
    return this._title
  }

  get order(): number {
    return this._order
  }

  get url(): string {
    return this._url
  }

  get seo(): SeoType {
    return this._seo! as SeoType
  }

  get image(): string {
    return this._image!
  }

  static create(params) {
    return new Category(params)
  }

  public setUrl(val): string {
    return translator(val)
  }

}
