import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../../shared/models/appointment.interface';
import { environment } from '../../../environments/environment';
import { UserInterface } from '../../../shared/models/User.interface';
import { jwtDecode } from 'jwt-decode';
import {DatePipe} from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { HistoriqueInfoComponent } from '../../components/historique-info/historique-info.component';
import { ValidationDialogComponent } from '../../components/validation-dialog/validation-dialog.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-historique',
  imports: [SpinnerComponent, FormsModule, DatePipe, PageHeaderComponent, MatCardModule],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  search = { value: ''};
  data = signal<Appointment[]>([]);
  page = signal<number>(1);
  total = signal<number>(1);
  totalPage = signal<number>(1);
  isSearching = signal(false);

  ngOnInit(): void {
      this.fetchData(1);
  }

  setCurrentRate(i: number, id: string){
    this.data.update((h) =>
      h.map((histo) =>
        histo._id === id ? { ...histo, hoverRate: i } : histo
      )
    );
  }

  historyInfoDialog(index: number) {
      this.dialog.open(HistoriqueInfoComponent, {
        maxWidth: '90vw',
        maxHeight: '90vh',
        data: this.data()[index]
      });
  }

  confirmDialog(id: string, i: number) {
    const confirmDialogRef = this.dialog.open(ValidationDialogComponent);
    confirmDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.http.put(`${environment.apiUrl}/api/appointments/${id}/rate`, {
          rate: i
        }).subscribe(() => {
          this.data.update(histories =>
            histories.map(history =>
              history._id === id ? { ...history, rate: i } : history
            )
          );
        });
      }
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
        params: {
          page: p_page
        }
      }).subscribe((response: any) => {
        this.data.set(response.data);
        this.page.set(parseInt(response.page));
        this.total.set(response.total);
        this.totalPage.set(response.totalPage);
      });
    }
  }

  searchVehicle() {
    this.isSearching.set(true)
    const token = localStorage.getItem('JWT_TOKEN');
    let user: UserInterface;
    if(token){
      user = {
        ...jwtDecode(token)
      };

      this.http.get(`${environment.apiUrl}/api/clients/${user.id}/appointments/completed`, {
        params: {
          page: 1,
          registrationNumber: this.search.value
        }
      }).subscribe((response: any) => {
        this.data.set(response.data);
        this.page.set(parseInt(response.page));
        this.total.set(response.total);
        this.totalPage.set(response.totalPage);
        this.isSearching.set(false)
      });
    }
  }
}
