import {afterNextRender, afterRender, inject, Injectable, PLATFORM_ID} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Sinup, Login, resetPassword, forgetPassword} from '../../shared/interfaces/user';
import {jwtDecode} from 'jwt-decode';
import {isPlatformBrowser} from '@angular/common';
import { API_BASE_URL } from '../token/api.token';
import {endPoint} from '../enums/endPoints.enums';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _API_BASE_URL = inject(API_BASE_URL);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private _httpClient=inject(HttpClient);
  userData:BehaviorSubject<any> = new BehaviorSubject('');
  constructor() {
    afterNextRender(()=>{
      this.isLoggedIn()
    })
  }

  register(data:Sinup): Observable<any> {
    return this._httpClient.post(`${this._API_BASE_URL}/${endPoint.signUp}`, data)
  }

  login(data:Login): Observable<any> {
    return this._httpClient.post(`${this._API_BASE_URL}/${endPoint.signIn}`, data)
  }

  forgotPassword(data:forgetPassword): Observable<any> {
    return this._httpClient.post(`${this._API_BASE_URL}/${endPoint.forgotPassword}`, data)
  }

  verifyResetCode(code:number): Observable<any> {
    return this._httpClient.post(`${this._API_BASE_URL}/${endPoint.verifyResetCode}`, {resetCode:`${code}`})
  }
  resetPassword(data:resetPassword): Observable<any> {
    return this._httpClient.put(`${this._API_BASE_URL}/${endPoint.resetPassword}`, data)
  }

  saveUser(){
    if (localStorage.getItem('userToken')){
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      console.log(this.userData);
    }
  }

  isLoggedIn(): boolean{
    if (isPlatformBrowser(this._PLATFORM_ID)){
      if (localStorage.getItem('userToken')){
        this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }

  getToken(){
    if (isPlatformBrowser(this._PLATFORM_ID)){
      if (localStorage.getItem('userToken')){
        return localStorage.getItem('userToken');
      }
    }
    return '';
  }
  logout(){
    localStorage.removeItem('userToken');
    this.userData.next('');
  }

}
