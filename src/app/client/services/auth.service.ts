import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private apiUrl = environment.apiUrl;
  private isAuthenticated = signal<boolean>(false);
  private http  = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/client/login');
  }

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
