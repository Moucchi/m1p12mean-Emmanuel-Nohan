import { HttpClient } from '@angular/common/http';
  import { Injectable, inject } from '@angular/core';
  import { environment } from '../../../environments/environment';
  import { GarageLoginFormData } from '../../models/auth/garage-login-form-data';
  import {catchError, Observable} from 'rxjs';
  import { GarageLoginResponse } from '../../models/auth/garage-login-response';
  import { tap } from 'rxjs/operators';
  import { jwtDecode } from 'jwt-decode';
  import { UserInterface } from '../../../shared/models/User.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class GarageAuthService {
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);

    login(credentials: GarageLoginFormData): Observable<GarageLoginResponse> {
      return this.http.post<GarageLoginResponse>(`${this.apiUrl}/api/auth`, credentials)
        .pipe(
          tap(response => {
            localStorage.setItem(this.JWT_TOKEN, response.token);
          }),
          catchError((error : Error) => {
            throw error;
          })
        );
    }

    logout() {
      localStorage.removeItem(this.JWT_TOKEN);
    }

    getUser(token: string): UserInterface {
      try {
        const decodedToken = jwtDecode<UserInterface>(token);

        return {
          id: decodedToken.id,
          email: decodedToken.email,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          role: decodedToken.role
        };
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
  }
