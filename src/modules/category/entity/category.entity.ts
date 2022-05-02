import { ICategory, ISEOType } from '@/types/models'
import { translator } from '@common/utils/translator'

export class Category {

  private readonly _url: string
  private readonly _title: string
  private readonly _order?: number
  private readonly _image?: string
  private readonly _parent?: string
  private readonly _children?: string[]
  private readonly _seo?: ICategory['seo']

  constructor({ title, seo, url, order, image, parent, children }: ICategory) {
    this._title = title
    this._order = order
    this._image = image
    this._parent = parent
    this._children = children
    this._seo = seo
    this._url = url || translator(this._title)
  }

  get title(): string {
    return this._title
  }

  get order(): number {
    return this._order!
  }

  get url(): string {
    return this._url
  }

  get seo(): ISEOType {
    return this._seo! as ISEOType
  }

  get image(): string {
    return this._image!
  }

  get parent(): string {
    return this._parent!
  }

  get children() {
    return this._children!
  }

  static create(params: ICategory) {
    return new Category(params)
  }

  static update(updates) {
    if (updates.title && !updates.url) updates.url = translator(updates.title)
    if (updates.seo) updates.seo = JSON.parse(updates.seo)
    return updates
  }
}
