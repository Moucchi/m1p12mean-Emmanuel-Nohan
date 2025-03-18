import {Route} from '@angular/router';
import {RegisterComponent} from './register/components/register.component';
import {LoginComponent} from './login/components/login.component';

export const authRoutes:Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Création de compte'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion'
  }
];
