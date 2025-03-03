import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../core/token/api.token';
import {CartResponse} from '../interfaces/cart-response';
import {endPoint} from '../../core/enums/endPoints.enums';
import {Order, ShippingAddress} from '../interfaces/order';

import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private _httpClient=inject(HttpClient);
  private baseUrl = inject(API_BASE_URL)
  private _PLATFORM_ID = inject(PLATFORM_ID)
  private appUrl!:string;
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.appUrl = location.origin
    }
  }

  createCashOrder(cartId:string , data:ShippingAddress):Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/${endPoint.order}/${cartId}` , {shippingAddress:data} )
  }

  getUserOrders(userId:string):Observable<Order[]> {
    return this._httpClient.get<Order[]>(`${this.baseUrl}/${endPoint.order}/user/${userId}`  )
  }

  CheckoutSession(cartId:string , data:ShippingAddress):Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/${endPoint.order}/checkout-session/${cartId}?url=${this.appUrl}` , {shippingAddress:data} )
  }




}
