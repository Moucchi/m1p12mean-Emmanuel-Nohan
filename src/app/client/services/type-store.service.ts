import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TypeVoiture } from '../../shared/models/type.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeStoreService {
  private types: WritableSignal<TypeVoiture[]> = signal([]);
  private http = inject(HttpClient);

  constructor() {
    this.http.get<TypeVoiture[]>(`${environment.apiUrl}/api/vehicles/types`).subscribe((response: any) => {
      this.types.set(response.data);
    });
   } 

  getTypes(): Signal<TypeVoiture[]> {
    return this.types;
  }
}
