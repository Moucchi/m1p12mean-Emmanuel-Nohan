import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vehicle } from '../../shared/models/vehicle.inteface';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from '../../shared/models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleStoreService {
  private vehicles: WritableSignal<Vehicle[]> = signal([]);
  private http = inject(HttpClient);
  private isLoading = signal<boolean>(false);
  constructor() {
    this.fetchVehicles();
  }
  
  fetchVehicles() {
    this.isLoading.set(true);
    const token = localStorage.getItem('JWT_TOKEN');
    let user: UserInterface;
    if(token){
      user = {
        ...jwtDecode(token)
      };
      this.http.get<Vehicle[]>(`${environment.apiUrl}/api/clients/${user.id}/vehicles`).subscribe((response: any) => {
        this.vehicles.set(response.data);
        this.isLoading.set(false);
      });
    } else{
      this.isLoading.set(false);
    }
  }

  addVehicle(data: any) {
    const token = localStorage.getItem('JWT_TOKEN');
    let user: UserInterface;
    if(token){
      user = {
        ...jwtDecode(token)
      };
      this.http.post<Vehicle>(`${environment.apiUrl}/api/clients/${user.id}/vehicles`, data).subscribe(() => {
          this.fetchVehicles();
      });
    }
  }

  loading(): Signal<boolean> {
    return this.isLoading;
  }

  getVehicles(): Signal<Vehicle[]> {
    return this.vehicles;
  }
}
