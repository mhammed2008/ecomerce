import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService=inject(AuthService).getToken();
  req = req.clone({
      setHeaders:{
        token: _authService!
      }
    })
  return next(req);
};
