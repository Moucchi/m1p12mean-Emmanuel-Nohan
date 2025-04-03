import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CompletedAppointment, CompletedAppointmentItem} from '../../../../models/appointment/history/completed-appointment';
import {CurrencyPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../../environments/environment';

interface ReportDialogData {
  appointment: CompletedAppointment;
}

@Component({
  selector: 'mean-report',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgOptimizedImage
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  protected dialogData = inject<ReportDialogData>(MAT_DIALOG_DATA);
  protected data: CompletedAppointment;

  constructor() {
    this.data = this.dialogData.appointment;
  }

  calculateTotal(items: CompletedAppointmentItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getImageUrl(img: string){
    return environment.apiUrl + '/uploads/' + img;
  }
}
