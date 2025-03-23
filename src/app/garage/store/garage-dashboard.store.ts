import {signalStore, withMethods, withState} from '@ngrx/signals';
import {ServiceRatingInterface} from '../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../models/dashboard/monthly-attendance-interface';
import {GarageDashboardService} from '../services/garage-dashboard.service';
import {inject} from '@angular/core';

type DashboardState = {
  averageRate: number;
  upComingAppointment: number;
  totalClient: number;
  topServices: ServiceRatingInterface[];
  totalRevenue: number;
  attendancePerMonth: MonthlyAttendanceInterface[];
  isLoading : boolean;
}

const initialSate: DashboardState = {
  averageRate: 0,
  upComingAppointment: 0,
  totalClient: 0,
  topServices: [],
  totalRevenue: 0,
  attendancePerMonth: [],
  isLoading: false,
}

export const GarageDashboardStore = signalStore(
  withState(initialSate),
  withMethods( (store, dashboardService = inject(GarageDashboardService)) => ({
    // TODO : implementer-na ireto vers 15h
    async getAverageRate() {},
    async getUpComingAppointment() {},
    async getTotalClient() {},
    async getTopServices() {},
    async getTotalRevenue() {},
    async getAttendancePerMonth() {}
  }) )
);
