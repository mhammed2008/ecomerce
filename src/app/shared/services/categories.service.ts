import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_BASE_URL} from '../../core/token/api.token';
import {endPoint} from '../../core/enums/endPoints.enums';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _httpClient:HttpClient = inject(HttpClient)
  private baseUrl = inject(API_BASE_URL)

  constructor() { }

  getAllCategories(): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.categories}`)
  }
  getSpecificCategory(id:string): Observable<any> {
    return this._httpClient.get(`${this.baseUrl}/${endPoint.categories}/${id}`)
  }
}
