import {Route} from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const clientRoutes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Bienvenue - Car Servicing'
  }
];
