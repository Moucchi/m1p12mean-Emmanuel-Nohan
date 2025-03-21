import { Routes} from '@angular/router';
import { clientRoutes } from './client/client.routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./shared/components/auth/auth.routes').then(c => c.authRoutes)
  },
  {
    path: "client",
    children: clientRoutes
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: "garage",
    loadChildren: () => import('./garage/garage.routes').then(c => c.garageRoutes),
    pathMatch: "full",

  }
];
