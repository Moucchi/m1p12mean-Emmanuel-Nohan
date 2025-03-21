import { inject, Injectable, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Marque } from '../../shared/models/marque.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueStoreService implements OnInit {
  private marques: WritableSignal<Marque[]> = signal([]);
  private http = inject(HttpClient);

  constructor() { } 

  ngOnInit(): void {
    this.http.get<Marque[]>(`${environment.apiUrl}/api/vehicles`).subscribe((response: any) => {
      this.marques.set(response.data);
    });
  }

  getMarques(): Signal<Marque[]> {
    return this.marques;
  }
}
