import {Component, inject, input, output} from '@angular/core';
import {MechanicAppointmentInterface} from '../../../../models/dashboard/mechanic-appointment-interface';
import {LuxonDatePipe} from '../../../../../shared/pipe/luxon-date.pipe';
import {CurrencyPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {GarageDashboardStore} from '../../../../store/garage-dashboard.store';
import {MatDialog} from '@angular/material/dialog';
import {VehicleHistoryComponent} from '../../../../pages/modals/appointment/vehicle-history/vehicle-history.component';

@Component({
  standalone: true,
  selector: 'appointment-mean-card',
  imports: [
    LuxonDatePipe,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './appointment-card.mean.component.html',
  providers: [CurrencyPipe, LuxonDatePipe],
})
export class AppointmentCardMeanComponent {
  protected readonly dashboardStore = inject(GarageDashboardStore);
  private readonly  dialog = inject(MatDialog);

  onFixDate = output<string>();
  onBegin = output<string>();
  onCompleted = output<string>();
  color = input.required<string>();
  title = input.required<string>();
  appointments = input.required<MechanicAppointmentInterface[]>();
  emptyMessage = input.required<string>();
  type = input.required<'pending' | 'approved'| 'in_progress' | string >();

  showCarHistoryDialog(_id: string) {
    this.dialog.open(VehicleHistoryComponent, {
      data : {
        id : _id
      }
    });
  }
}
