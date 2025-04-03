import {Component, effect, inject} from '@angular/core';
import {MechanicAppointmentInterface} from '../../../../models/dashboard/mechanic-appointment-interface';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../../../../../shared/models/dialog-data';
import {MechanicAppointmentStore} from '../../../../store/mechanicAppointment.store';
import {
  ManagerAppointmentCardComponent
} from '../../../../components/appointment/manager/card/manager-appointment-card.component';
import {SpinnerComponent} from '../../../../components/spinner/spinner.component';

@Component({
  selector: 'mean-track',
  imports: [
    ManagerAppointmentCardComponent,
    SpinnerComponent
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  protected readonly store = inject(MechanicAppointmentStore);

  pendingAppointments: MechanicAppointmentInterface[] = [];
  setAppointments: MechanicAppointmentInterface[] = [];
  confirmedAppointments: MechanicAppointmentInterface[] = [];
  inProgressAppointments: MechanicAppointmentInterface[] = [];

  selectedCardType = 'pending';

  constructor() {
    this.store.setId(this.data.id);
    this.store.track();

    effect(() => {
      this.refreshAppointments();
    });
  }

  refreshAppointments() {
    const appointments = this.store.appointments() ?? {};
    this.pendingAppointments = appointments.pending ?? [];
    this.setAppointments = appointments.set ?? [];
    this.confirmedAppointments = appointments.confirmed ?? [];
    this.inProgressAppointments = appointments.in_progress ?? [];
  }
}
