import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {UserInterface} from '../../shared/models/User.interface';
import {inject} from '@angular/core';
import {GarageAuthService} from '../services/garage-auth/garage-auth.service';
import {Router} from '@angular/router';
import {GarageLoginFormData} from '../models/auth/garage-login-form-data';
import {withDevtools} from '@angular-architects/ngrx-toolkit';

type AuthState = {
  isLogged: boolean;
  token: string;
  user: UserInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLogged: false,
  token: '',
  user: null,
  loading: false,
  error: null
}

export const GarageAuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, authService = inject(GarageAuthService), route = inject(Router)) => ({
        login(credentials: GarageLoginFormData) {
          patchState(store, {loading: true, error: null});

          authService.login(credentials).subscribe({
            next: (response) => {
              try {
                const token = response.token;
                const user = authService.getUser(token);

                patchState(store, {
                  isLogged: true,
                  token: token,
                  user: user,
                  loading: false,
                  error: null
                });

                route.navigateByUrl('/garage');
              } catch (error) {
                patchState(store, {
                  loading: false,
                  error: 'Token invalide'
                });
              }
            },

            error: (error) => {
              patchState(store, {
                loading: false,
                error: error instanceof Error ? error.message : "L'adresse mail et le mot de passe ne correspondent pas."
              });

              route.navigate(['/garage/login']);
            }
          });
        },
        logout() {
          authService.logout();

          patchState((store), {
            isLogged: false,
            token: '',
            user: null
          });

          route.navigate(['/garage/login']);
        },
        setToken(token: string) {
          try {
            const user = authService.getUser(token);

            if (user === null || (user.role !== "manager" && user.role !== "mechanics")) {
              throw new Error("Token invalide");
            }

            patchState(store, {
              isLogged: true,
              token,
              user,
              error: null
            });
          } catch (error) {
            patchState(store, {
              isLogged: false,
              token: '',
              user: null,
              error: error instanceof Error ? error.message : "Token invalide"
            });

            route.navigate(['/garage/login']);
          }
        }
      }
    )
  ),
  withDevtools('GarageAuthStore')
);
