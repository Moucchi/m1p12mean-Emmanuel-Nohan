import {Route} from '@angular/router';
import {garageAuthGuard} from './guards/garage-auth.guard';
import {garageManagerGuard} from './guards/garage-manager.guard';

export const garageRoutes: Route[] = [
  {
    path: "login",
    loadComponent: () => import("./pages/garage-login/garage-login.component").then(m => m.GarageLoginComponent),
    title: "Connexion"
  },
  {
    path: "",
    data: {breadcrumb: 'Garage', id: "main"},
    loadComponent: () => import("./components/garage-layout/garage-layout.component").then(m => m.GarageLayoutComponent),
    canActivateChild: [garageAuthGuard],
    children: [
      {
        path: "",
        loadComponent: () => import("./pages/garage-dashboard/garage-dashboard.component").then(m => m.GarageDashboardComponent),
        title: "Dashboard",
        data: {breadcrumb: 'Dashboard', id: "main/1"}
      },
      {
        path: "events",
        loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent),
        title: "Evenements",
        data: {breadcrumb: 'Calendrier', id: "main/2"}
      },
      {
        path: "mecanics",
        loadComponent: () => import('./pages/garage-mechanics/garage-mechanics.component').then(m => m.GarageMechanicsComponent),
        title: "Mecaniciens",
        data: {breadcrumb: 'Mécanicien', id: "main/2"},
        canActivate: [garageManagerGuard]
      },
      {
        path: "services",
        loadComponent: () => import('./pages/garage-service/garage-service.component').then(m => m.GarageServiceComponent),
        title: "Services",
        data: {breadcrumb: 'Service', id: "main/3"},
        canActivate: [garageManagerGuard]
      },
      {
        path: "historique",
        loadComponent: () => import('./pages/garage-historique/garage-historique.component').then(m => m.GarageHistoriqueComponent),
        title: "Historique des prestations",
        data: {breadcrumb: 'Historique des prestations', id: "main/4"},
        canActivate: [garageManagerGuard]
      }
    ]
  }
]
