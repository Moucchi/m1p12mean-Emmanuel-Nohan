import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {catchError} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {
  GarageAddServiceResponse,
  GarageServiceResponseInterface
} from '../../models/service/garage-service-response.interface';
import {GarageServiceFormInterface} from '../../models/service/garage-service-form.interface';

@Injectable({
  providedIn: 'root'
})
export class GarageServiceService {
  private http = inject(HttpClient);
  private readonly authStore = inject(GarageAuthStore);
  private readonly backendUrl = environment.apiUrl;

  getAllServices() {
    if (this.authStore.isManager()) {
      return this.http.get<GarageServiceResponseInterface>(`${this.backendUrl}/api/services`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }
    return null;
  }

  getPage(page: number) {
    if (this.authStore.isManager()) {
      return this.http.get<GarageServiceResponseInterface>(`${this.backendUrl}/api/services?page=${page}`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  addService(value : GarageServiceFormInterface){
    if (this.authStore.isManager()) {
      return this.http.post<GarageAddServiceResponse>(`${this.backendUrl}/api/services`, value).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  updateService(id : string, value : GarageServiceFormInterface ){
    if (this.authStore.isManager()) {
      return this.http.put<GarageServiceResponseInterface>(`${this.backendUrl}/api/services/${id}`, value).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }

  deleteService(id : string){
    if (this.authStore.isManager()) {
      return this.http.delete<GarageServiceResponseInterface>(`${this.backendUrl}/api/services/${id}`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }
}
