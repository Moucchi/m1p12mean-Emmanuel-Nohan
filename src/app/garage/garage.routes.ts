import {Route} from '@angular/router';
import {CalendarComponent} from '../shared/components/calendar/calendar.component';
import {garageAuthGuard} from './guards/garage-auth.guard';

export const garageRoutes: Route[] = [
  {
    path: "login",
    loadComponent: () => import("./pages/garage-login/garage-login.component").then(m => m.GarageLoginComponent),
    title: "Connexion"
  },
  {
    path: "",
    data: { breadcrumb: 'Garage' },
    loadComponent: () => import("./components/garage-layout/garage-layout.component").then(m => m.GarageLayoutComponent),
    canActivateChild: [garageAuthGuard],
    children: [
      {
        path: "",
        loadComponent: () => import("./pages/garage-dashboard/garage-dashboard.component").then(m => m.GarageDashboardComponent),
        title: "Dashboard",
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: "events",
        component: CalendarComponent,
        title: "Evenements",
        data: { breadcrumb: 'Calendrier' }
      }
    ]
  }
]
