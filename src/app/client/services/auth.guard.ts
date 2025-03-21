import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('JWT_TOKEN');
  const router = inject(Router);
  if(token != null){
    const decodedToken = jwtDecode(token);
    return true;
  }else{
    router.navigateByUrl('/client/login');
    return false;
  }
};
