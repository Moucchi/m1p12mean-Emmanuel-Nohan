import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../../shared/models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private apiUrl = environment.apiUrl;
  private isAuthenticated = signal<boolean>(false);
  private http  = inject(HttpClient);
  currentUser = signal<UserInterface>({
    email: '',
    lastName: '',
    firstName: '',
    role: 'client'
  });

  constructor() {}

  login(user: {
    email: string,
    password: string
  }): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/clients/auth`, user).pipe(
      tap((response: any) => {
        this.isAuthenticated.set(true);
        localStorage.setItem(this.JWT_TOKEN, response.token);
      }),
      catchError(error => {
        throw error
      })
    );
  }
}
