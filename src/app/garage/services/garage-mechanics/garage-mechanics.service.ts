import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {catchError} from 'rxjs';
import {MechanicResponse} from '../../models/mechanics/mechanic-response';
import {GarageAuthStore} from '../../store/garage-auth.store';

@Injectable({
  providedIn: 'root'
})
export class GarageMechanicsService {
  private readonly backendUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private readonly authStore = inject(GarageAuthStore);

  getAllMechanics() {
    if (this.authStore.isManager()) {
      return this.http.get<MechanicResponse>(`${this.backendUrl}/api/employees/mechanics`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }
    return null;
  }

  getPage(page: number) {
    if (this.authStore.isManager()) {
      return this.http.get<MechanicResponse>(`${this.backendUrl}/api/employees/mechanics?page=${page}`).pipe(
        catchError((error: Error) => {
          throw error;
        })
      );
    }

    return null;
  }
}
