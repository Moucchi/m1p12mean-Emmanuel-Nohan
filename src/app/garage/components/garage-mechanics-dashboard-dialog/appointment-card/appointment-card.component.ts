import {Component, inject, input, output} from '@angular/core';
import {MechanicAppointmentInterface} from '../../../models/dashboard/mechanic-appointment-interface';
import {LuxonDatePipe} from '../../../../shared/pipe/luxon-date.pipe';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {GarageDashboardStore} from '../../../store/garage-dashboard.store';

@Component({
  standalone: true,
  selector: 'appointment-card',
  imports: [
    LuxonDatePipe,
    NgOptimizedImage
  ],
  providers: [CurrencyPipe, LuxonDatePipe],
  templateUrl: './appointment-card.component.html',
})
export class AppointmentCardComponent {
  protected readonly dashboardStore = inject(GarageDashboardStore);

  onFixDate = output<string>();
  onBegin = output<string>();
  onCompleted = output<string>();
  color = input.required<string>();
  title = input.required<string>();
  appointments = input.required<MechanicAppointmentInterface[]>();
  emptyMessage = input.required<string>();
  type = input.required<'pending' | 'approved'| 'in_progress' | string >();
}
