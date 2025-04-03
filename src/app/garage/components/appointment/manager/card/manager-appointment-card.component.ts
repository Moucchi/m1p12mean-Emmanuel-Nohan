import {Component, inject, input} from '@angular/core';
import {GarageDashboardStore} from '../../../../store/garage-dashboard.store';
import {MechanicAppointmentInterface} from '../../../../models/dashboard/mechanic-appointment-interface';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {LuxonDatePipe} from '../../../../../shared/pipe/luxon-date.pipe';

@Component({
  selector: 'manager-appointment-card',
  imports: [
    DatePipe,
    LuxonDatePipe,
    NgOptimizedImage
  ],
  templateUrl: './manager-appointment-card.component.html',
  styleUrl: './manager-appointment-card.component.css'
})
export class ManagerAppointmentCardComponent {
  protected readonly dashboardStore = inject(GarageDashboardStore);
  color = input.required<string>();
  title = input.required<string>();
  appointments = input.required<MechanicAppointmentInterface[]>();
  emptyMessage = input.required<string>();
  type = input.required<'pending' | 'approved'| 'in_progress' | string >();
}
