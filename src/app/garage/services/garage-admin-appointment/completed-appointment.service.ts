import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {catchError} from 'rxjs';
import {CompletedAppointmentResponse} from '../../models/appointment/history/completed-appointment';

@Injectable({
  providedIn: 'root'
})
export class CompletedAppointmentService {
  private http = inject(HttpClient);
  private backendUrl = environment.apiUrl;

  getAllCompletedAppointment() {
    return this.http.get<CompletedAppointmentResponse>(`${this.backendUrl}/api/appointments/completed`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getPage(page: number) {
    return this.http.get<CompletedAppointmentResponse>(`${this.backendUrl}/api/appointments/completed?page=${page}`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

}
