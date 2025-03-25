import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {AuthService} from '../client/services/auth.service';
import {environment} from '../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.tokenName);
  let requestToSend = req;
  if (token) {
    const headers = req.headers.set('Authorization', 'Bearer ' + token);
    requestToSend = req.clone({
      headers: headers
    })
  }
  return next(requestToSend);
};

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status == 403) {

        const authUrl = `${environment.apiUrl}/api/auth`;
        const clientUrl = `${environment.apiUrl}/api/clients/auth`;

        if (req.url !== clientUrl && req.url !== authUrl) {
          authService.logout();
        }

      }
      throw error;
    })
  );
}
