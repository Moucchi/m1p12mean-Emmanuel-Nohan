import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {
  GarageServiceInterface,
} from '../models/service/garage-service-response.interface';
import {inject} from '@angular/core';
import {GarageServiceService} from '../services/garage-service/garage-service.service';
import {withDevtools} from '@angular-architects/ngrx-toolkit';

type ServiceState = {
  total: number;
  page: number;
  totalPages: number;
  services: GarageServiceInterface[];
  filteredServices: GarageServiceInterface[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  filteredServices: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 0,
  totalPages: 0
}

const defaultErrorMessage = "Une erreur s'est produite, veuillez réessayer plus tard.";

export const GarageServiceStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, service = inject(GarageServiceService)) => ({

    getAllServices() {
      patchState(store, {isLoading: true});

      service.getAllServices()?.subscribe({
        next: (response) => {
          const {total, page, totalPages, data} = response;

          patchState(store, {
            services: data,
            total: total,
            page: page,
            totalPages: totalPages
          });
        },
        error: () => {
          patchState(store, {
            error: defaultErrorMessage
          });
        }
      });

      patchState(store, {isLoading: false});
    },

    goToPage(page: number) {
      patchState(store, {isLoading: true});

      service.getPage(page)?.subscribe({
        next: (response) => {
          const {total, page, totalPages, data} = response;

          patchState(store, {
            services: data,
            total: total,
            page: page,
            totalPages: totalPages
          });
        },
        error: () => {
          patchState(store, {
            error: defaultErrorMessage
          });
        }
      });

      patchState(store, {isLoading: false});
    },

    getById(id: string) {
      return store.services().find((service) => service._id === id);
    },

    nextPage() {
      if (store.page() + 1 <= store.totalPages()) {
        patchState(store, {isLoading: true});

        service.getPage(store.page())?.subscribe({
          next: (response) => {
            const {total, page, totalPages, data} = response;

            patchState(store, {
              services: data,
              total: total,
              page: page,
              totalPages: totalPages
            });
          },
          error: () => {
            patchState(store, {
              error: defaultErrorMessage
            });
          }
        });

        patchState(store, {isLoading: false});
      }
    },

    previousPage() {
      if (store.page() - 1 >= 1) {
        patchState(store, {isLoading: true});

        service.getPage(store.page())?.subscribe({
          next: (response) => {
            const {total, page, totalPages, data} = response;

            patchState(store, {
              services: data,
              total: total,
              page: page,
              totalPages: totalPages
            });
          },
          error: () => {
            patchState(store, {
              error: defaultErrorMessage
            });
          }
        });

        patchState(store, {isLoading: false});
      }
    },

  })),
  withDevtools("ServiceStore")
);
