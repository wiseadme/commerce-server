import { SeoType } from '@/types/models'
import { translator } from '@/common/utils/translator'

export class Category {
  private readonly _url: string

  constructor(
    private readonly _title: string,
    private readonly _order: number,
    private readonly _seo?: SeoType
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
    return this._seo! as SeoType
  }

  setUrl(val): string {
    return translator(val)
  }
}
