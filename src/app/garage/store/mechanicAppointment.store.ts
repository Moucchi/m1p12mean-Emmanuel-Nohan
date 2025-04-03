import {MechanicAppointments} from '../models/dashboard/mechanic-appointment-interface';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {GarageDashboardService} from '../services/garage-dashboard/garage-dashboard.service';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {GarageAuthStore} from './garage-auth.store';

type mechanicAppointmentState = {
  mechanicId: string,
  appointments: MechanicAppointments,
  error: null | string,
  loading: boolean
}

const initialState: mechanicAppointmentState = {
  mechanicId: '',
  appointments: {
    pending: [],
    set: [],
    confirmed: [],
    in_progress: []
  },
  error: null,
  loading: false
}

export const MechanicAppointmentStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, service = inject(GarageDashboardService)) => ({
    setId(id: string) {
      patchState(store, {mechanicId: id});
    },

    track() {
      patchState(store, {loading: true})

      service.trackMechanicsAppointment(store.mechanicId()).subscribe(
        {
          next: (result) => {
            patchState(store, {appointments: result, loading: false})
          },
          error: () => {
            patchState(store, {error: "Une erreur s'est produite ... ", loading: false});
          }
        }
      )

    }
  })),

  withHooks({
    onInit: (store, authStore = inject(GarageAuthStore)) => {
      const id = authStore.getId()!;
      patchState(store, {mechanicId: id});

      store.track();
    },
    onDestroy: (store) => {
      patchState(store, {
        mechanicId: '',
        appointments: {
          pending: [],
          set: [],
          confirmed: [],
          in_progress: []
        },
        error: null,
        loading: false
      });
    }
  }),

  withDevtools("Rendez-vous mecancien")
);
