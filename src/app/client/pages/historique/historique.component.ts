import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { HistoryItem } from '../../../shared/models/historique-appointment.interface';
import { environment } from '../../../environments/environment';
import { UserInterface } from '../../../shared/models/User.interface';
import { jwtDecode } from 'jwt-decode';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { HistoriqueInfoComponent } from '../../components/historique-info/historique-info.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-historique',
  imports: [MatButton, DatePipe, PageHeaderComponent, MatCardModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  data = signal<HistoryItem[]>([]);
  page = signal<number>(1);
  total = signal<number>(1);
  totalPage = signal<number>(1);
  currentRate = signal(0);

  ngOnInit(): void {
      this.fetchData(1);
  }

  setCurrentRate(i: number){
    this.currentRate.set(i);
  }

  historyInfoDialog(index: number) {
      this.dialog.open(HistoriqueInfoComponent, {
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: this.data()[index]
      });
    }

  downloadFacturePdf(id: string){
    this.http.get(`${environment.apiUrl}/api/appointments/${id}/pdf`, {
      responseType: 'blob'
    }).subscribe(pdf => {
      window.open(URL.createObjectURL(pdf));
    });
  } 
  
  fetchData(p_page: number) {
    const token = localStorage.getItem('JWT_TOKEN');
    let user: UserInterface;
    if(token){
      user = {
        ...jwtDecode(token)
      };
      this.http.get(`${environment.apiUrl}/api/clients/${user.id}/appointments/completed`, {
        params: {page: p_page}
      }).subscribe((response: any) => {
        this.data.set(response.data);
        this.page.set(parseInt(response.page));
        this.total.set(response.total);
        this.totalPage.set(response.totalPage);
      });
    }
  }
}
