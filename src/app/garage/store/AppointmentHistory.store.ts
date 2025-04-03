import {CompletedAppointment, CompletedAppointmentResponse} from '../models/appointment/history/completed-appointment';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {CompletedAppointmentService} from '../services/garage-admin-appointment/completed-appointment.service';

type AppointmentHistoryState = {
  appointments: CompletedAppointment[] | null,
  total: number,
  totalPages: number,
  page: number,
  loading: boolean,
  message: string,
  error: string | null
}

const initialState: AppointmentHistoryState = {
  appointments: null,
  total: 0,
  totalPages: 0,
  page: 1,
  loading: false,
  message: '',
  error: null
}

export const CompletedAppointmentStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, service = inject(CompletedAppointmentService)) => ({
    getAllCompletedAppointment() {
      patchState(store, {loading: true});

      service.getAllCompletedAppointment().subscribe({
        next: (response: CompletedAppointmentResponse) => {
          patchState(store, {
            appointments: response.data,
            total: response.total,
            totalPages: response.totalPages,
            page: response.page,
            loading: false
          })
        },
        error: () => {
          patchState(store, {
            loading: false,
            message: "Une erreur s'est produite lors de la récupération des données."
          });
        }
      });
    },

    nextPage() {
      if (store.page() + 1 <= store.totalPages()) {
        patchState(store, {loading: true});

        service.getPage(store.page() + 1)?.subscribe({
          next: (response: CompletedAppointmentResponse) => {
            patchState(store, {
              appointments: response.data,
              total: response.total,
              totalPages: response.totalPages,
              page: response.page,
              loading: false
            });
          },
          error: (error: Error) => patchState(store, {error: error.message})
        });

        patchState(store, {loading: false});
      }
    },

    previousPage() {
      if (store.page() - 1 >= 1) {
        patchState(store, {loading: true});

        service.getPage(store.page() - 1)?.subscribe({
          next: (response: CompletedAppointmentResponse) => {

            patchState(store, {
              appointments: response.data,
              total: response.total,
              totalPages: response.totalPages,
              page: response.page,
              loading: false
            });
          },
          error: (error: Error) => patchState(store, {error: error.message})
        });

        patchState(store, {loading: false});
      }
    },

    goToPage(page: number) {
      if( page <= store.totalPages() && page >= 1) {
        patchState(store, {loading: true});

        service.getPage(page)?.subscribe({
          next: (response: CompletedAppointmentResponse) => {

            patchState(store, {
              appointments: response.data,
              total: response.total,
              totalPages: response.totalPages,
              page: response.page,
              loading: false
            });
          },
          error: (error: Error) => patchState(store, {error: error.message})
        });

        patchState(store, {loading: false});
      }
    },
  }))
);
