import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./shared/components/auth/auth.routes').then(c => c.authRoutes)
  },
  {
    path: "",
    loadComponent: () => import('./shared/components/calendar/calendar.component').then(c => c.CalendarComponent)
  }
];
