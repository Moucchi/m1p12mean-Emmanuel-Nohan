import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs';
import {GarageDashboardInterface} from '../../models/dashboard/garage-dashboard-interface';
import {ServiceRatingInterface} from '../../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../../models/dashboard/monthly-attendance-interface';

@Injectable({
  providedIn: 'root'
})
export class GarageDashboardService {
  private readonly backendUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAverageRate() {
    return this.http.get<number>(`${this.backendUrl}/api/dashboard/rate`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getUpComingAppointment() {
    return this.http.get<number>(`${this.backendUrl}/api/dashboard/upcoming-appointments`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getTotalClient() {
    return this.http.get<number>(`${this.backendUrl}/api/dashboard/total-clients`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getTopServices() {
    return this.http.get<ServiceRatingInterface[]>(`${this.backendUrl}/api/dashboard/top-services`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getActualMonthRevenue() {
    return this.http.get<number>(`${this.backendUrl}/api/dashboard/month-revenue`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getAttendancePerMonth(year : number) {
    return this.http.get<MonthlyAttendanceInterface[]>(`${this.backendUrl}/api/dashboard/attendances/${year}`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  getDashboardData(){
    return this.http.get<GarageDashboardInterface>(`${this.backendUrl}/api/dashboard`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
