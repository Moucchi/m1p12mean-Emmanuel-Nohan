import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly http = inject(HttpClient);

  downloadInvoice(id: string) {
    this.http.get(`${environment.apiUrl}/api/appointments/${id}/pdf`, {
      responseType: 'blob'
    }).subscribe(pdf => {
      window.open(URL.createObjectURL(pdf));
    });
  }
}
