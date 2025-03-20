import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(c => c.authRoutes)
  },
  {
    path: "",
    loadComponent: () => import('./calendar/component/calendar.component').then(c => c.CalendarComponent)
  }
];
