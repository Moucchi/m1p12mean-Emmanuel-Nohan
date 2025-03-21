import {Route} from '@angular/router';
import {CalendarComponent} from '../shared/components/calendar/calendar.component';

export const garageRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./pages/garage-layout/garage-layout.component").then(m => m.GarageLayoutComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./components/garage-dashboard/garage-dashboard.component").then(m => m.GarageDashboardComponent),
        title: "Dashboard",
      },
      {
        path: "events",
        component: CalendarComponent,
        title: "Evenements",
      }
    ]
  }
]
