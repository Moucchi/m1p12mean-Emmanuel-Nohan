import {CompletedAppointment, CompletedAppointmentResponse} from '../models/appointment/history/completed-appointment';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {inject} from '@angular/core';
import {CompletedAppointmentService} from '../services/garage-admin-appointment/completed-appointment.service';
import {Router} from '@angular/router';

type AppointmentHistoryState = {
  appointments: CompletedAppointment[] | null,
  total: number,
  totalPages: number,
  page: number,
  loading: boolean,
  message: string
}

const initialState: AppointmentHistoryState = {
  appointments: null,
  total: 0,
  totalPages: 0,
  page: 1,
  loading: false,
  message: ''
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
    }

  })),
  withDevtools("CompletedAppointmentHistory")
);
