import { translator } from '@common/utils/translator'
import { IProduct } from '../types/model'

export class Product implements IProduct {
  private readonly _name: IProduct['name']
  private readonly _price: IProduct['price']
  private readonly _count: IProduct['count']
  private readonly _unit: IProduct['unit']
  private readonly _description: IProduct['description']
  private readonly _image: IProduct['image']
  private readonly _url: IProduct['url']
  private readonly _categories: IProduct['categories']
  private readonly _seo: IProduct['seo']
  private readonly _assets: IProduct['assets']
  private readonly _variants: IProduct['variants']
  private readonly _attributes: IProduct['attributes']
  private readonly _isVisible: IProduct['isVisible']

  constructor({
    name,
    price,
    description,
    image,
    assets,
    seo,
    count,
    unit,
    url,
    variants,
    categories,
    attributes,
    isVisible,
  }: IProduct){
    this._name = name
    this._price = price
    this._count = count
    this._unit = unit
    this._description = description
    this._image = image || ''
    this._url = url || translator(name).toLowerCase()
    this._seo = seo
    this._assets = assets
    this._variants = variants
    this._categories = categories
    this._attributes = attributes
    this._isVisible = isVisible
  }

  get name(){
    return this._name
  }

  get price(){
    return this._price
  }

  get count(){
    return this._count
  }

  get unit(){
    return this._unit
  }

  get description(){
    return this._description
  }

  get categories(){
    return this._categories
  }

  get variants(){
    return this._variants
  }

  get image(){
    return this._image
  }

  get assets(){
    return this._assets
  }

  get seo(){
    return this._seo
  }

  get attributes(){
    return this._attributes
  }

  get url(){
    return this._url
  }

  get isVisible(){
    return this._isVisible
  }

  static create(product): IProduct{
    return new Product(product)
  }

  static update(updates){
    if (updates.name) updates.url = translator(updates.name)
    if (updates.seo) updates.seo = JSON.parse(updates.seo)

    return updates
  }
}
