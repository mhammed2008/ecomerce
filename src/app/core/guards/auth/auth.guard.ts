import {CanActivateFn, Router} from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID =inject(PLATFORM_ID);
  const _router =inject(Router);
  if (isPlatformBrowser(_PLATFORM_ID)){
    if (localStorage.getItem('userToken')) {
      return true;
    }
    _router.navigate(['/auth/login']);
    return false;
  }
  return false;
};
