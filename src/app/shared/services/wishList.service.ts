import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../core/token/api.token';
import {CartResponse} from '../interfaces/cart-response';
import {endPoint} from '../../core/enums/endPoints.enums';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private _httpClient=inject(HttpClient);
  private baseUrl = inject(API_BASE_URL)

  constructor() { }

  addProductToWishList(productId: string):Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/${endPoint.wishList}` , {productId})
  }

  getWishList():Observable<any> {
    return this._httpClient.get<any>(`${this.baseUrl}/${endPoint.wishList}` )
  }

  deleteProductFromWishList(productId: string):Observable<any> {
    return this._httpClient.delete(`${this.baseUrl}/${endPoint.wishList}/${productId}`)
  }



}
