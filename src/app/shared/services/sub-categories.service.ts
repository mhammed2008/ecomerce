import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {endPoint} from '../../core/enums/endPoints.enums';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../core/token/api.token';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  private _httpClient:HttpClient = inject(HttpClient)
  private baseUrl = inject(API_BASE_URL)
  constructor() { }

  getAllSubCategories(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.subCategories}`)
  }
  getAllSubCategoriesOnCategory(id:string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/categories/${id}/${endPoint.subCategories}`)
  }
  getSpecificSubCategory(id:string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.subCategories}/${id}`)
  }
}
