import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {catchError, map, Observable} from 'rxjs';
import {
  VehicleHistoryInterface,
  VehicleHistoryResponse
} from '../../models/history/vehicleHistory/vehicle-history-response';

@Injectable({
  providedIn: 'root'
})
export class VehicleHistoryService {
  private readonly http = inject(HttpClient);
  private readonly backendUrl = environment.apiUrl;

  getCarHistory(id: string): Observable<VehicleHistoryInterface[]> {
    return this.http.get<VehicleHistoryResponse>(`${this.backendUrl}/api/vehicles/${id}/history`)
      .pipe(
        map((result) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }


}
