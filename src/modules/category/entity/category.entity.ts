import { ICategory, SeoType } from '@/types/models';
import { translator } from '@/common/utils/translator';

export class Category {

  private readonly _url: string;
  private readonly _title: string;
  private readonly _order?: number;
  private readonly _seo?: SeoType;
  private readonly _image?: string;
  private readonly _parent?: string;

  constructor({ title, seo, order, image, parent }: ICategory) {
    this._title = title;
    this._order = order;
    this._image = image;
    this._parent = parent;
    this._seo = seo;
    this._url = this.setUrl(this._title);
  }

  get title(): string {
    return this._title;
  }

  get order(): number {
    return this._order!;
  }

  get url(): string {
    return this._url;
  }

  get seo(): SeoType {
    return this._seo! as SeoType;
  }

  get image(): string {
    return this._image!;
  }

  get parent(): string {
    return this._parent!;
  }

  public setUrl(val): string {
    return translator(val);
  }

  static create(params) {
    return new Category(params);
  }

  static update(updates) {
    if (updates.title) updates.url = translator(updates.title);
    if (updates.seo) updates.seo = JSON.parse(updates.seo);
    return updates;
  }

}
