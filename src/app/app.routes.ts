import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./shared/components/auth/auth.routes').then(c => c.authRoutes)
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: "garage",
    // loadComponent: () => import('./shared/components/calendar/calendar.component').then(c => c.CalendarComponent)
    loadChildren: () => import('./garage/garage.routes').then(c => c.garageRoutes),
    pathMatch: "full",
  }
];
