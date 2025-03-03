import {Product} from './product';

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}
