import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ServiceRatingInterface} from '../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../models/dashboard/monthly-attendance-interface';
import {GarageDashboardService} from '../services/garage-dashboard/garage-dashboard.service';
import {inject} from '@angular/core';
import {GarageDashboardInterface} from '../models/dashboard/garage-dashboard-interface';
import {withDevtools} from '@angular-architects/ngrx-toolkit';

type DashboardState = {
  averageRate: number;
  isAverageRateLoading: boolean;
  upComingAppointment: number;
  isUpComingAppointmentLoading: boolean;
  totalClients: number;
  isTotalClientsLoading: boolean;
  topServices: ServiceRatingInterface[];
  isTopServicesLoading: boolean;
  actualMonthRevenue: number;
  isActualMonthRevenueLoading: boolean;
  attendancePerMonth: MonthlyAttendanceInterface[];
  isAttendancePerMonthLoading: boolean;
  isLoading: boolean;
  error: string | null
}

const initialState: DashboardState = {
  averageRate: 0,
  isAverageRateLoading: false,
  upComingAppointment: 0,
  isUpComingAppointmentLoading: false,
  totalClients: 0,
  isTotalClientsLoading: false,
  topServices: [],
  isTopServicesLoading: false,
  actualMonthRevenue: 0,
  isActualMonthRevenueLoading: false,
  attendancePerMonth: [],
  isAttendancePerMonthLoading: false,
  isLoading: false,
  error: null
}

export const GarageDashboardStore = signalStore(
  withState(initialState),
  withMethods((store, dashboardService = inject(GarageDashboardService)) => ({
    getAverageRate() {
      patchState(store, {isAverageRateLoading: true});

      try {
        dashboardService.getAverageRate().subscribe((response: number) => {
          patchState(store, {averageRate: response, isAverageRateLoading: false});
        });
      } catch (e) {
        patchState(store, {
          isAverageRateLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

    },

    getUpComingAppointment() {
      patchState(store, {isUpComingAppointmentLoading: true});

      try {

      } catch (e) {
        patchState(store, {
          isUpComingAppointmentLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

      dashboardService.getUpComingAppointment().subscribe((response: number) => {
        patchState(store, {upComingAppointment: response, isUpComingAppointmentLoading: false});
      });
    },

    getTotalClient() {
      patchState(store, {isTotalClientsLoading: true});

      try {
        dashboardService.getTotalClient().subscribe((response: number) => {
          patchState(store, {totalClients: response, isTotalClientsLoading: false});
        });
      } catch (e) {
        patchState(store, {
          isTotalClientsLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

    },

    getTopServices() {
      patchState(store, {isTopServicesLoading: true});

      try {
        dashboardService.getTopServices().subscribe((response: ServiceRatingInterface[]) => {
          patchState(store, {topServices: response, isTopServicesLoading: false});
        });
      } catch (e) {
        patchState(store, {
          isTopServicesLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

    },

    getActualMonthRevenue() {
      patchState(store, {isActualMonthRevenueLoading: true});

      try {
        dashboardService.getActualMonthRevenue().subscribe((response: number) => {
          patchState(store, {actualMonthRevenue: response, isActualMonthRevenueLoading: false});
        });
      } catch (e) {
        patchState(store, {
          isActualMonthRevenueLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

    },

    getAttendancePerMonth(year: number = 2025) {
      patchState(store, {isAttendancePerMonthLoading: true});

      try {
        dashboardService.getAttendancePerMonth(year).subscribe((response: MonthlyAttendanceInterface[]) => {
          patchState(store, {attendancePerMonth: response, isAttendancePerMonthLoading: false});
        });
      } catch (e) {
        patchState(store, {
          isAttendancePerMonthLoading: false,
          error: "Une erreur est survenue, veuillez réessayer plus tard "
        });
      }

    },

    getDashboardData() {
      patchState(store, {isLoading: true});

      try {
        dashboardService.getDashboardData().subscribe((response: GarageDashboardInterface) => {
          patchState(store, {
            averageRate: response.avgRate,
            upComingAppointment: response.upcomingAppointment,
            totalClients: response.totalClients,
            actualMonthRevenue: response.totalRevenueCurrentMonth,
            topServices: response.topServices,
            attendancePerMonth: response.attendancePerMonth,
            isLoading: false
          });
        });
      } catch (e) {
        patchState(store, {isLoading: false, error: "Une erreur est survenue, veuillez réessayer plus tard "});
      }
    }

  })),
  withDevtools('GarageDashboardStore')
);
