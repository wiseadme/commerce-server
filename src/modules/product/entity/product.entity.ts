import { IAssetItem, IProduct, IProductSEO, IVariant } from '@/types/models';
import { translator } from '@/common/utils/translator';

export class Product {
  private readonly _name: string;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _image: string;
  private readonly _url: string;
  private readonly _seo: IProductSEO | null;
  private readonly _assets: IAssetItem[] | [];
  private readonly _variants: IVariant[] | [];

  constructor({ name, price, description, image, assets, seo, variants }: IProduct) {
    this._name = name;
    this._price = price;
    this._description = description;
    this._image = image || '';
    this._url = translator(name);
    this._seo = seo || null;
    this._assets = assets || [];
    this._variants = variants || [];
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  get description() {
    return this._description
  }

  static create(product): IProduct {
    return new Product(product);
  }

  static update(updates) {

  }
}
