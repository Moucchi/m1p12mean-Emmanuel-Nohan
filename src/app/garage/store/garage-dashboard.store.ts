import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {ServiceRatingInterface} from '../models/dashboard/service-rating-interface';
import {MonthlyAttendanceInterface} from '../models/dashboard/monthly-attendance-interface';
import {GarageDashboardService} from '../services/garage-dashboard/garage-dashboard.service';
import {inject} from '@angular/core';
import {DateTime} from 'luxon';
import {MechanicAppointments} from '../models/dashboard/mechanic-appointment-interface';
import {GarageAuthStore} from './garage-auth.store';
import {Router} from '@angular/router';
import {SettingAppointmentForm} from '../models/dashboard/setting-appointment-form';
import {HttpErrorResponse} from '@angular/common/http';

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
  appointmentMessage: string;
  isLoading: boolean;
  error: string | null,
  inProgress: boolean;
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
    pending: undefined,
    set: undefined,
    confirmed: undefined,
    in_progress: undefined
  },
  isLoading: false,
  error: null,
  appointmentMessage: "",
  inProgress: false
}

export const GarageDashboardStore = signalStore(
  {providedIn: "root"},
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

      dashboardService.getAttendancePerMonth(year).subscribe({
        next: (response: MonthlyAttendanceInterface[]) => {
          patchState(store, {attendancePerMonth: response, isAttendancePerMonthLoading: false});
        },
        error: (e) => {
          const error = e as HttpErrorResponse;
          patchState(store, {isAttendancePerMonthLoading: false, appointmentMessage: error.error.error});
        }
      });
    },

    getDashboardData() {
      patchState(store, {isLoading: true});

      dashboardService.getDashboardData().subscribe({
        next: (response) => {
          patchState(store, {
            averageRate: response.avgRate,
            upComingAppointment: response.upcomingAppointment,
            totalClients: response.totalClients,
            actualMonthRevenue: response.totalRevenueCurrentMonth,
            topServices: response.topServices,
            attendancePerMonth: response.attendancePerMonth,
            isLoading: false
          });
        },

        error: (e) => {
          const error = e as HttpErrorResponse;
          patchState(store, {isLoading: false, appointmentMessage: error.error.error});
        }
      });
    },

    getMechanicsAppointments() {
      patchState(store, {isLoading: true});

      if (authStore.isMechanic()) {
        dashboardService.getMechanicsAppointments().subscribe({
          next: (response: MechanicAppointments) => {
            patchState(store, {mechanicsAppointments: response});

            if (response.in_progress && response.in_progress.length > 0) {
              patchState(store, {inProgress: true, isLoading: false});
            } else {
              patchState(store, {inProgress: false, isLoading: false});
            }
          },
          error: (e) => {
            const error = e as HttpErrorResponse;
            patchState(store, {isLoading: false, appointmentMessage: error.error.error});
          }
        });

      } else {
        router.navigateByUrl('/403').then(() => {
          patchState(store, {isLoading: false});
        });
      }
    },

    setAppointmentDate(id: string, form: SettingAppointmentForm) {
      patchState(store, {isLoading: true});

      if (authStore.isMechanic()) {
        dashboardService.setAppointmentDate(id, form).subscribe(
          {
            next: () => {
              this.getMechanicsAppointments();
              patchState(store, {appointmentMessage: "Créneau envoyé avec succès", isLoading: false});
            },
            error: (e) => {
              const error = e as HttpErrorResponse;
              console.log(`error : \n ${JSON.stringify(error)}`);
              patchState(store, {isLoading: false, appointmentMessage: error.error.error});
            }
          });
      } else {
        router.navigateByUrl('/403').then(() => {
          patchState(store, {isLoading: false});
        });
      }
    },

    markAppointmentAsInProgress(id: string) {
      patchState(store, {isLoading: true});

      if (authStore.isMechanic()) {
        dashboardService.markAppointmentAsInProgress(id).subscribe(
          {
            next: () => {
              this.getMechanicsAppointments();
              patchState(store, {appointmentMessage: "Réparation commencée", isLoading: false});
            },
            error: (e) => {
              const error = e as HttpErrorResponse;

              patchState(store, {isLoading: false, appointmentMessage: error.error.error});
            }
          }
        );
      } else {
        router.navigateByUrl('/403').then(() => {
          patchState(store, {isLoading: false});
        });
      }
    },

    markAppointmentAsCompleted(id: string, form: FormData) {

      patchState(store, {isLoading: true});

      if (authStore.isMechanic()) {
        dashboardService.markAppointmentAsCompleted(id, form).subscribe({
          next: () => {
            this.getMechanicsAppointments();
            patchState(store, {appointmentMessage: "Réparation terminée", isLoading: false});
          },
          error: (e) => {
            const error = e as HttpErrorResponse;
            patchState(store, {isLoading: false, appointmentMessage: error.error.error});
          }
        });

      } else {
        router.navigateByUrl('/403').then(() => {
          patchState(store, {isLoading: false});
        });
      }
    },

    resetAppointmentMessage() {
      patchState(store, {appointmentMessage: ""});
    }

  }))

);
