import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {GarageAuthStore} from './garage/store/garage-auth.store';
import {environment} from './environments/environment.prod';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      const token = localStorage.getItem(environment.tokenName);
      const garageAuthStore = inject(GarageAuthStore);

      if (!token) {
        return 'client/home';
      }

      try {
        garageAuthStore.setToken(token);

        garageAuthStore.user();

        return 'garage';

      } catch (e) {
        return 'client/home';
      }

    },
    pathMatch: 'full'
  },
  {
    path: "client",
    loadChildren: () => import('./client/client.routes').then(c => c.clientRoutes),
  },
  {
    path: "garage",
    loadChildren: () => import('./garage/garage.routes').then(c => c.garageRoutes),
  },
  {
    path: "403",
    loadComponent: () => import('./shared/pages/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent),
  },
  {
    path: "**",
    loadComponent: () => import('./shared/pages/not-found/not-found.component').then(c => c.NotFoundComponent),
  }
];
