import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../core/token/api.token';
import {CartResponse} from '../interfaces/cart-response';
import {endPoint} from '../../core/enums/endPoints.enums';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _httpClient=inject(HttpClient);
  private baseUrl = inject(API_BASE_URL)
  cartNav:BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }

  addProductToCart(productId: string):Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/${endPoint.cart}` , {productId})
  }
  updateProductQuantity(productId: string , count: string):Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/${endPoint.cart}/${productId}` , {count})
  }
  getCart():Observable<CartResponse> {
    return this._httpClient.get<CartResponse>(`${this.baseUrl}/${endPoint.cart}` )
  }

  deleteProductFromCart(productId: string):Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/${endPoint.cart}/${productId}`)
  }

  deleteAllCart():Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/${endPoint.cart}`)
  }

  updateCartNavbar(cart:any){
    this.cartNav.next(cart);
  }

}
