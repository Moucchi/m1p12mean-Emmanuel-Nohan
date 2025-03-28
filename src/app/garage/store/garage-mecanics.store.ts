import {Mechanics} from '../models/mechanics/mechanics';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {inject} from '@angular/core';
import {GarageMechanicsService} from '../services/garage-mechanics/garage-mechanics.service';
import {MechanicResponse} from '../models/mechanics/mechanic-response';

type MechanicStoreState = {
  mechanics: Mechanics[];
  total: number;
  totalPage: number;
  page: number;
  isLoading: boolean;
  error: string;
}

const intialState: MechanicStoreState = {
  mechanics: [],
  total: 0,
  totalPage: 0,
  page: 1,
  isLoading: false,
  error: ''
}

export const MechanicStore = signalStore(
  {providedIn: 'root'},
  withState(intialState),
  withMethods((store, mecanicsService = inject(GarageMechanicsService)) => ({
    getAllMechanics() {
      patchState(store, {isLoading: true});

      mecanicsService.getAllMechanics().subscribe({
        next: (response: MechanicResponse) => {
          patchState(store, {
            mechanics: response.data,
            total: response.total,
            totalPage: response.totalPage,
            page: response.page,
            isLoading: false
          });
        },
        error: (error: Error) => patchState(store, {error: error.message, isLoading: false}),
      });
    },

    nextPage() {
      if( store.page() + 1 <= store.totalPage()) {
        mecanicsService.getPage(store.page() + 1).subscribe({
          next: (response: MechanicResponse) => {
            patchState(store, {
              mechanics: response.data,
              total: response.total,
              totalPage: response.totalPage,
              page: response.page,
              isLoading: false
            });
          },
          error: (error: Error) => patchState(store, {error: error.message, isLoading: false})
        });
      }
    },

    previousPage() {
      if (store.page() - 1 >= 1) {
        mecanicsService.getPage(store.page() - 1).subscribe({
          next: (response: MechanicResponse) => {
            patchState(store, {
              mechanics: response.data,
              total: response.total,
              totalPage: response.totalPage,
              page: response.page,
              isLoading: false
            });
          },
          error: (error: Error) => patchState(store, {error: error.message, isLoading: false})
        });
      }
    },

    goToPage(page: number) {
      mecanicsService.getPage(page).subscribe({
        next: (response: MechanicResponse) => {
          patchState(store, {
            mechanics: response.data,
            total: response.total,
            totalPage: response.totalPage,
            page: response.page,
            isLoading: false
          });
        },
        error: (error: Error) => patchState(store, {error: error.message, isLoading: false})
      });
    }
  })),
  withDevtools('mechanicStore')
);
