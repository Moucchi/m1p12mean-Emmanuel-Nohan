import {Route} from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './services/auth.guard';
import { VehiculeComponent } from './pages/vehicule/vehicule.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { HistoriqueComponent } from './pages/historique/historique.component';
import { SuiviComponent } from './pages/suivi/suivi.component';

export const clientRoutes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Bienvenue - Car Servicing'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Se connecter - Car Servcing'
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
    title: "S'inscrire - Car Servcing"
  },
  {
    path: 'home',
    component: WelcomeComponent,
    title: 'Home - Car Servicing',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'rendez-vous', 
        pathMatch: 'full',
      },
      {
        path: 'vehicules',
        component: VehiculeComponent,
      },
      {
        path: 'rendez-vous',
        component: AppointmentComponent
      },
      {
        path: 'historique-des-rendez-vous',
        component: HistoriqueComponent
      },
      {
        path: 'suivi',
        component: SuiviComponent
      }
    ]
  }
];
