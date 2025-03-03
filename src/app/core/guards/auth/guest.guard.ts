import {CanActivateFn, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {inject, PLATFORM_ID} from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID =inject(PLATFORM_ID);
  const _router =inject(Router);
  if (isPlatformBrowser(_PLATFORM_ID)){
    if (localStorage.getItem('userToken')) {
      _router.navigate(['/home']);
      return false;
    }
    return true;
  }
  return true;
};
