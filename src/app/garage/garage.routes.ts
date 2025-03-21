import {Route} from '@angular/router';

export const garageRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./pages/garage-layout/garage-layout.component").then(m => m.GarageLayoutComponent)
  }
]
