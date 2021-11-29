import { SeoType } from '../../../types/models'
import { translator } from '../../../app/utils/translator'

export class Category {
  private readonly _url: string
  private _seo?: SeoType

  constructor(
    private readonly _title: string,
    private readonly _order: number,
  ) {
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
    return this._seo!
  }

  setUrl(val): string {
    return translator(val)
  }

  setSeo(val) {
    if (typeof val === 'string') {
      this._seo = JSON.parse(val)
    } else {
      this._seo = val || null
    }
  }
}
