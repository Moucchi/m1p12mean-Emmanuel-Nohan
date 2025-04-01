import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs';
import {GarageDashboardInterface} from '../../models/dashboard/garage-dashboard-interface';
import {ServiceRatingInterface} from '../../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../../models/dashboard/monthly-attendance-interface';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {MechanicsAppointmentsResponseInterface} from '../../models/dashboard/mechanics-appointments-response-interface';
import {SettingAppointmentForm} from '../../models/dashboard/setting-appointment-form';

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

  getMechanicsAppointments() {
    if (this.authStore.isMechanic()) {
      return this.http.get<MechanicsAppointmentsResponseInterface>(`${this.backendUrl}/api/employees/${this.authStore.getId()}/appointments`).pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  setAppointmentDate(id: string, form : SettingAppointmentForm) {
    return this.http.put(`${this.backendUrl}/api/appointments/${id}`, form).pipe(
      catchError((error) => {
        throw error;
      })
    )
  }
}
