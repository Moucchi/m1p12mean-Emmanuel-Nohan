import {CanActivateFn, Router} from '@angular/router';
import {GarageAuthStore} from '../store/garage-auth.store';
import {inject} from '@angular/core';


export const garageManagerGuard: CanActivateFn = (route, state) => {
  const authStore = inject(GarageAuthStore);
  const router = inject(Router);

  if(authStore.isManager()){
    return true;
  }

  router.navigateByUrl('/403');

  return false;
};
