import { ICategory } from '../types/model'
import { ISEOType } from '@/types/models'
import { translator } from '@common/utils/translator'

export class Category implements ICategory {

  private readonly _url: string
  private readonly _title: string
  private readonly _order?: number
  private readonly _image?: string
  private readonly _parent?: string
  private readonly _children?: string[]
  private readonly _seo?: ICategory['seo']
  private readonly _isVisible: boolean

  constructor({ title, seo, url, order, image, parent, children, isVisible }: ICategory){
    this._title = title
    this._order = order
    this._image = image
    this._parent = parent
    this._children = children
    this._isVisible = isVisible
    this._seo = seo
    this._url = url || translator(this._title).toLowerCase()
  }

  get title(): string{
    return this._title
  }

  get order(): number{
    return this._order!
  }

  get url(): string{
    return this._url
  }

  get seo(): ISEOType{
    return this._seo! as ISEOType
  }

  get image(): string{
    return this._image!
  }

  get parent(): string{
    return this._parent!
  }

  get children(){
    return this._children!
  }

  get isVisible(){
    return this._isVisible
  }

  static create(category: ICategory){
    return new Category(category as ICategory)
  }

  static update(updates){
    if (updates.title && !updates.url) updates.url = translator(updates.title)
    return updates
  }
}
