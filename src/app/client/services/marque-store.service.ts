import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Marque } from '../../shared/models/marque.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueStoreService {
  private marques: WritableSignal<Marque[]> = signal([]);
  private http = inject(HttpClient);

  constructor() {
    this.http.get<Marque[]>(`${environment.apiUrl}/api/vehicles`).subscribe((response: any) => {
      this.marques.set(response.data);
    });
   } 

  getMarques(): Signal<Marque[]> {
    return this.marques;
  }
}
