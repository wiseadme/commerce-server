import { translator } from '@common/utils/translator';
import { IProduct } from '@/types/models';

export class Product {
  private readonly _name: string;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _image: string;
  private readonly _url: string;
  private readonly _categories: IProduct['categories'];
  private readonly _seo: IProduct['seo'];
  private readonly _assets: IProduct['assets'];
  private readonly _variants: IProduct['variants'];

  constructor({ name, price, description, image, assets, seo, variants, categories }: IProduct){
    this._name = name;
    this._price = price;
    this._description = description;
    this._image = image || '';
    this._url = translator(name);
    this._seo = seo;
    this._assets = assets;
    this._variants = variants;
    this._categories = categories;
  }

  get name(){
    return this._name;
  }

  get price(){
    return this._price;
  }

  get description(){
    return this._description;
  }

  get categories(){
    return this._categories;
  }

  get variants(){
    return this._variants;
  }

  get image() {
    return this._image
  }

  get assets(){
    return this._assets;
  }

  get seo() {
    return this._seo
  }

  get url() {
    return this._url
  }

  static create(product): IProduct{
    return new Product(product);
  }

  static update(updates){

  }
}
