import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {
  GarageServiceInterface,
} from '../models/service/garage-service-response.interface';
import {inject} from '@angular/core';
import {GarageServiceService} from '../services/garage-service/garage-service.service';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {GarageServiceFormInterface} from '../models/service/garage-service-form.interface';

type ServiceState = {
  total: number;
  page: number;
  totalPages: number;
  services: GarageServiceInterface[];
  filteredServices: GarageServiceInterface[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ServiceState = {
  services: [],
  filteredServices: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 0,
  totalPages: 0,
  success: null
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

    updateService(id: string, value: GarageServiceFormInterface) {
      patchState( store , {isLoading: true});

      service.updateService(id, value)?.subscribe(
        {
          next: () => {
            this.getAllServices();
            patchState(store, {
              success: "Service mis à jour avec succès",
              error: null
            });
          },
          error: () => {
            patchState(store, {
              error: defaultErrorMessage
            });
          }
        }
      );

      patchState( store , {isLoading: false});

    },

    deleteService(id : string){
      patchState(store, {isLoading: true});

      service.deleteService(id)?.subscribe(
        {
          next: () => {
            this.getAllServices();
            patchState(store, {
              success: "Service supprimé avec succès",
              error: null
            });
          },
          error: () => {
            patchState(store, {
              error: defaultErrorMessage
            });
          }
        }
      );

      patchState(store, {isLoading: false});
    },

    nextPage() {
      const destinationPage = store.page() + 1;

      if (destinationPage <= store.totalPages()) {
        this.goToPage(destinationPage);
      }
    },

    previousPage() {
      const destinationPage = store.page() - 1;

      if (destinationPage >= 1) {
        this.goToPage(destinationPage);
      }
    },

    resetRegisterMessage() {
      patchState(store, {error: null, success: null});
    },

  })),
  withDevtools("ServiceStore")
);
