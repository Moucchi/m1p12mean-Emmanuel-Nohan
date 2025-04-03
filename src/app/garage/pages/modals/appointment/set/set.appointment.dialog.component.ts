import {Component, inject} from '@angular/core';
import {GarageDashboardStore} from '../../../../store/garage-dashboard.store';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormFieldValidatorsService} from '../../../../../shared/services/form/form-field-validators.service';
import {AppointmentFormService} from '../../../../services/garage-mechanics-appointement/appointment-form.service';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {SettingAppointmentForm} from '../../../../models/dashboard/setting-appointment-form';

type DialogData = {
  id: string
}

@Component({
  selector: 'mean-set',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatLuxonDateModule
  ],
  templateUrl: './set.appointment.dialog.component.html',
  styleUrl: './set.appointment.dialog.component.css',
})
export class SetAppointmentDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<SetAppointmentDialogComponent>);
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private readonly dashboardStore = inject(GarageDashboardStore);
  private readonly formFieldsValidators = inject(FormFieldValidatorsService);
  private readonly appointmentService = inject(AppointmentFormService);

  appointmentForm = this.formBuilder.nonNullable.group({
    startingDate: ['', [Validators.required, this.formFieldsValidators.validateAppointmentDate]],
    startingTime: [null, Validators.required],
    endingDate: ['', [Validators.required, this.formFieldsValidators.validateAppointmentDate]],
    endingTime: [null, Validators.required],
  });

  setAppointment() {
    if (this.appointmentForm.valid) {
      const startingDate = this.appointmentForm.getRawValue().startingDate;
      const startingTime = this.appointmentForm.getRawValue().startingTime!;
      const endingDate = this.appointmentForm.getRawValue().endingDate;
      const endingTime = this.appointmentForm.getRawValue().endingTime!;

      const formValue: SettingAppointmentForm = {
        startedDate: this.appointmentService.formatIntoDateTime(startingDate, startingTime),
        endingDate: this.appointmentService.formatIntoDateTime(endingDate, endingTime)
      }

      this.dashboardStore.setAppointmentDate(this.data.id, formValue);
    }

    this.dialogRef.close();
  }
}
