import {TypeVoiture} from '../../shared/models/type.interface';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {environment} from '../../environments/environment';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs';
import {VehicleTypeResponse} from '../../shared/models/vehicle-type-response';
import {VehicleTypeForm} from '../../shared/models/vehicle-type-form';

type VehicleState = {
  vehicles: TypeVoiture[],
  isLoading: boolean,
  error: null | string,
  snackMessage : null | string
}

const initialState: VehicleState = {
  vehicles: [],
  isLoading: false,
  error: null,
  snackMessage : null
}

export const vehicleStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    getAllTypes() {
      patchState(store, {isLoading: true});

      http.get<VehicleTypeResponse>(`${environment.apiUrl}/api/vehicles/types`).pipe(
        map((response: VehicleTypeResponse) => {
          return response.data;
        })
      )
        .subscribe({
          next: (result) => {
            patchState(store, {vehicles: result, isLoading: false});
          },
          error: () => {
            patchState(store, {isLoading: false, error: "Erreur lors de la récupération des types de véhicules"});
          }
        });
    },

    addType(form: VehicleTypeForm) {
      patchState(store, {isLoading: true});

      http.post<VehicleTypeForm>(`${environment.apiUrl}/api/vehicles/types`, form).pipe(
        catchError((error: Error) => {
          throw error;
        })
      )
        .subscribe({
          next: () => {
            patchState( store , { snackMessage : "Type ajouté avec success" } )
            this.getAllTypes();
          },
          error: () => {
            patchState(store, {isLoading: false, snackMessage : "Une erreur s'est produite lors de la création du type" });
          }
        });
    },

    resetSnackMessage() {
      patchState(store, {snackMessage: null});
    }

  })),
);
