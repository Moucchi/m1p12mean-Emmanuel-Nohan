import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {vehicleStore} from '../../../garage/store/VehicleStore';

@Component({
  selector: 'mean-add-type',
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './add-type.component.html',
  styleUrl: './add-type.component.css'
})
export class AddTypeComponent {
  private readonly dialogRef = inject(MatDialogRef<AddTypeComponent>);
  private formBuilder = inject(FormBuilder);
  private readonly typeStore = inject(vehicleStore);

  form = this.formBuilder.nonNullable.group({
    type: [ '' , Validators.required ],
    priceMultiplierPercent: [ 0, [ Validators.required, Validators.min(0) ] ]
  });

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.typeStore.addType(this.form.getRawValue());
      this.closeDialog();
    }
  }

}
