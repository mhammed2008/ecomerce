import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MonoTypeOperatorFunction, Observable} from 'rxjs';
import {API_BASE_URL} from '../../core/token/api.token';
import {endPoint} from '../../core/enums/endPoints.enums';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _httpClient:HttpClient=inject(HttpClient);
  baseUrl=inject(API_BASE_URL);
  constructor() { }

  getAllProducts():Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.product}`);
  }

  getProductPage(page:number):Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.product}?page=${page}`);
  }



  getSpecificProduct(id : string):Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.product}/${id}`);
  }
}
