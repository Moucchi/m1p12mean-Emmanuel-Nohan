import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('JWT_TOKEN');
  let requestToSend = req;
  if(token) {
    const headers = req.headers.set('Authorization', 'Bearer ' + token);
    requestToSend = req.clone({
      headers: headers
    })
  }
  return next(requestToSend);
};

export function httpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status == 403) {
        router.navigateByUrl('/client/login');
      }
      throw error;
    })
  );
}
