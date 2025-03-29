import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs';
import {GarageDashboardInterface} from '../../models/dashboard/garage-dashboard-interface';
import {ServiceRatingInterface} from '../../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../../models/dashboard/monthly-attendance-interface';
import {GarageAuthService} from '../garage-auth/garage-auth.service';
import {GarageAuthStore} from '../../store/garage-auth.store';

@Injectable({
  providedIn: 'root'
})
export class GarageDashboardService {
  private readonly backendUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private readonly authStore = inject(GarageAuthStore);


  getAverageRate() {
    if (this.authStore.isManager()) {
      return this.http.get<number>(`${this.backendUrl}/api/dashboard/rate`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }
    return null;
  }

  getUpComingAppointment() {
    if (this.authStore.isManager()) {
      return this.http.get<number>(`${this.backendUrl}/api/dashboard/upcoming-appointments`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }
    return null;
  }

  getTotalClient() {
    if (this.authStore.isManager()) {
      return this.http.get<number>(`${this.backendUrl}/api/dashboard/total-clients`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  getTopServices() {
    if (this.authStore.isManager()) {
      return this.http.get<ServiceRatingInterface[]>(`${this.backendUrl}/api/dashboard/top-services`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  getActualMonthRevenue() {
    if (this.authStore.isManager()) {
      return this.http.get<number>(`${this.backendUrl}/api/dashboard/month-revenue`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  getAttendancePerMonth(year: number) {
    if (this.authStore.isManager()) {
      return this.http.get<MonthlyAttendanceInterface[]>(`${this.backendUrl}/api/dashboard/attendances/${year}`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  getDashboardData() {
    if (this.authStore.isManager()) {
      return this.http.get<GarageDashboardInterface>(`${this.backendUrl}/api/dashboard`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }
}
