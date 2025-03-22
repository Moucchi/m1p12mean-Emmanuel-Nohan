import {Route} from '@angular/router';
import {CalendarComponent} from '../shared/components/calendar/calendar.component';

export const garageRoutes: Route[] = [
  {
    path: "",
    data: { breadcrumb: 'Garage' },
    loadComponent: () => import("./components/garage-layout/garage-layout.component").then(m => m.GarageLayoutComponent),
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
