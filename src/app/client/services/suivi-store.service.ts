import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Suivi } from '../../shared/models/suivi.interface';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../../shared/models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class SuiviStoreService {
  private suivi: WritableSignal<Suivi> = signal({
    pending: [],
    set: [],
    confirmed: [],
    in_progress: []
  });
  private http = inject(HttpClient);

  constructor() {
    this.fetchSuivi();
  }

  fetchSuivi(){
     const token = localStorage.getItem('JWT_TOKEN');
     let user: UserInterface;
     if(token){
       user = {
         ...jwtDecode(token)
       };
       this.http.get<Suivi>(`${environment.apiUrl}/api/clients/${user.id}/active-appointments`).subscribe((response: any) => {
         this.suivi.set(response.data);
      });
    }
  }

  cancelAppointment(id: string, index: number, state: string){
    this.http.put(`${environment.apiUrl}/api/clients/appointments/${id}/cancel`, {}).subscribe(() => {
      if(state == 'set'){
        this.suivi.update(suivi => ({
          ...suivi,
          set: suivi.pending.filter((_, i) => index !== i)
        }));
      } 

      if(state == 'pending'){
        this.suivi.update(suivi => ({
          ...suivi,
          pending: suivi.pending.filter((_, i) => index !== i)
        }));
      }

      if(state == 'confirmed'){
        this.suivi.update(suivi => ({
          ...suivi,
          confirmed: suivi.pending.filter((_, i) => index !== i)
        }));
      }
    });
  }
  
  getSuivi(): Signal<Suivi> {
    return this.suivi;
  }
}
