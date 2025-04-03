import {Route} from '@angular/router';
import {garageAuthGuard} from './guards/garage-auth.guard';
import {garageManagerGuard} from './guards/garage-manager.guard';
import {mechanicGuard} from './guards/mechanic.guard';

export const garageRoutes: Route[] = [
  {
    path: "login",
    loadComponent: () => import("./pages/login/garage-login.component").then(m => m.GarageLoginComponent),
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
        loadComponent: () => import("./pages/dashboard/garage-dashboard.component").then(m => m.GarageDashboardComponent),
        title: "Dashboard",
        data: {breadcrumb: 'Dashboard', id: "main/1"}
      },
      {
        path: "events",
        loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent),
        title: "Evenements",
        data: {breadcrumb: 'Calendrier', id: "main/2"},
        canActivate: [mechanicGuard]

      },
      {
        path: "mecanics",
        loadComponent: () => import('./pages/mechanics/garage-mechanics.component').then(m => m.GarageMechanicsComponent),
        title: "Mecaniciens",
        data: {breadcrumb: 'Mécanicien', id: "main/2"},
        canActivate: [garageManagerGuard]
      },
      {
        path: "services",
        loadComponent: () => import('./pages/services/garage-service.component').then(m => m.GarageServiceComponent),
        title: "Services",
        data: {breadcrumb: 'Service', id: "main/3"},
        canActivate: [garageManagerGuard]
      },
      {
        path: "historique",
        loadComponent: () => import('./pages/historique/garage-historique.component').then(m => m.GarageHistoriqueComponent),
        title: "Historique des prestations",
        data: {breadcrumb: 'Historique des prestations', id: "main/4"},
        canActivate: [garageManagerGuard]
      },
      {
        path: "types",
        loadComponent: () => import('./pages/vehicule-type/vehicule-type.component').then(m => m.VehiculeTypeComponent),
        title: "Type de vehicule",
        data: {breadcrumb: 'Type de vehicule', id: "main/5"},
        canActivate: [garageManagerGuard]
      }
    ]
  }
]
