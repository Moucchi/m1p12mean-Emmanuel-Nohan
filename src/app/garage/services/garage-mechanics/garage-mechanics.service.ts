import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {catchError} from 'rxjs';
import {MechanicResponse} from '../../models/mechanics/mechanic-response';

@Injectable({
  providedIn: 'root'
})
export class GarageMechanicsService {
  private readonly backendUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllMechanics(){
    return this.http.get<MechanicResponse>(`${this.backendUrl}/api/employees/mechanics`).pipe(
      catchError((error: Error) => {
        throw error;
      })
    );
  }
}
