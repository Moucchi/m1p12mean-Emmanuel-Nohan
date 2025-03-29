import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ServiceRatingInterface} from '../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../models/dashboard/monthly-attendance-interface';
import {GarageDashboardService} from '../services/garage-dashboard/garage-dashboard.service';
import {inject} from '@angular/core';
import {GarageDashboardInterface} from '../models/dashboard/garage-dashboard-interface';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {DateTime} from 'luxon';
import {MechanicAppointments} from '../models/dashboard/mechanic-appointment-interface';
import {GarageAuthStore} from './garage-auth.store';
import {Router} from '@angular/router';

const defaultErrorMessage = "Une erreur est survenue, veuillez réessayer plus tard ";

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
  mechanicsAppointments: MechanicAppointments;
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
  mechanicsAppointments: {
    pending: [],
    set: [],
    confirmed: [],
    in_progress: []
  },
  isLoading: false,
  error: null
}

export const GarageDashboardStore = signalStore(
  withState(initialState),
  withMethods((store, dashboardService = inject(GarageDashboardService), authStore = inject(GarageAuthStore), router = inject(Router)) => ({
    getAverageRate() {
      patchState(store, {isAverageRateLoading: true});

      try {
        dashboardService.getAverageRate()?.subscribe((response: number) => {
          patchState(store, {averageRate: response});
        });

        patchState(store, {isAverageRateLoading: false});

      } catch (e) {
        patchState(store, {
          isAverageRateLoading: false,
          error: defaultErrorMessage
        });
      }

    },

    getUpComingAppointment() {
      patchState(store, {isUpComingAppointmentLoading: true});

      try {
        dashboardService.getUpComingAppointment()?.subscribe((response: number) => {
          patchState(store, {upComingAppointment: response});
        });

        patchState(store, {isUpComingAppointmentLoading: false});

      } catch (e) {
        patchState(store, {
          isUpComingAppointmentLoading: false,
          error: defaultErrorMessage
        });
      }


    },

    getTotalClient() {
      patchState(store, {isTotalClientsLoading: true});

      try {
        dashboardService.getTotalClient()?.subscribe((response: number) => {
          patchState(store, {totalClients: response});
        });
        patchState(store, {isTotalClientsLoading: false});

      } catch (e) {
        patchState(store, {
          isTotalClientsLoading: false,
          error: defaultErrorMessage
        });
      }

    },

    getTopServices() {
      patchState(store, {isTopServicesLoading: true});

      try {
        dashboardService.getTopServices()?.subscribe((response: ServiceRatingInterface[]) => {
          patchState(store, {topServices: response});
        });
        patchState(store, {isTopServicesLoading: false});

      } catch (e) {
        patchState(store, {
          isTopServicesLoading: false,
          error: defaultErrorMessage
        });
      }

    },

    getActualMonthRevenue() {
      patchState(store, {isActualMonthRevenueLoading: true});

      try {
        dashboardService.getActualMonthRevenue()?.subscribe((response: number) => {
          patchState(store, {actualMonthRevenue: response});
        });
        patchState(store, {isActualMonthRevenueLoading: false});

      } catch (e) {
        patchState(store, {
          isActualMonthRevenueLoading: false,
          error: defaultErrorMessage
        });
      }

    },

    getAttendancePerMonth(year: number = DateTime.now().year) {
      patchState(store, {isAttendancePerMonthLoading: true});

      try {
        dashboardService.getAttendancePerMonth(year)?.subscribe((response: MonthlyAttendanceInterface[]) => {
          patchState(store, {attendancePerMonth: response});
        });
        patchState(store, {isAttendancePerMonthLoading: false});

      } catch (e) {
        patchState(store, {
          isAttendancePerMonthLoading: false,
          error: defaultErrorMessage
        });
      }

    },

    getDashboardData() {
      patchState(store, {isLoading: true});

      try {
        dashboardService.getDashboardData()?.subscribe((response: GarageDashboardInterface) => {
          patchState(store, {
            averageRate: response.avgRate,
            upComingAppointment: response.upcomingAppointment,
            totalClients: response.totalClients,
            actualMonthRevenue: response.totalRevenueCurrentMonth,
            topServices: response.topServices,
            attendancePerMonth: response.attendancePerMonth
          });
        });

        patchState(store, {isLoading: false});
      } catch (e) {
        patchState(store, {isLoading: false, error: defaultErrorMessage});
      }
    },

    getMechanicsAppointments() {
      patchState(store, {isLoading: true});

      if (authStore.isMechanic()) {

        try {
          dashboardService.getMechanicsAppointments()?.subscribe((response: MechanicAppointments) => {
            patchState(store, {mechanicsAppointments: response});
          });
          patchState(store, {isLoading: false});

        } catch (e) {
          patchState(store, {isLoading: false, error: defaultErrorMessage});
        }

      } else {
        router.navigateByUrl('/403').then(() => {
          patchState(store, {isLoading: false});
        });
      }
    }

  })),
  withDevtools('GarageDashboardStore')
);
