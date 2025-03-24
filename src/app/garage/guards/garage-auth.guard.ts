import {CanActivateFn, Router} from '@angular/router';
import {GarageAuthStore} from '../store/garage-auth.store';
import {inject} from '@angular/core';
import {environment} from '../../environments/environment.prod';

export const garageAuthGuard: CanActivateFn = (route, state) => {
  const authStore = inject(GarageAuthStore);
  const router = inject(Router);
  const token = localStorage.getItem(environment.tokenName);

  if (state.url === '/garage/login') {
    return true;
  }

  if (token) {
    try {
      if (!authStore.user()) {
        authStore.setToken(token);
      }
      return true;
    } catch (e) {
      router.navigateByUrl('/garage/login');
      return false;
    }
  } else {
    router.navigateByUrl('/garage/login');
    return false;
  }
};
