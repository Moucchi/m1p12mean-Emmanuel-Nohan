import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {GarageAuthStore} from '../store/garage-auth.store';

export const mechanicGuard: CanActivateFn = (route, state) => {
  const authStore = inject(GarageAuthStore);
  const router = inject(Router);

  if(authStore.isMechanic()){
    return true;
  }

  router.navigateByUrl('/403');

  return false;
};
