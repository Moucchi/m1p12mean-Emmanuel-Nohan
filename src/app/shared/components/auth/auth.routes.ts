import {Route} from '@angular/router';
import {RegisterComponent} from './sign-up/register.component';
import {LoginComponent} from './sign-in/login.component';

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
