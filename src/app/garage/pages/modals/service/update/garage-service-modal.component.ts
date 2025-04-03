import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {GarageServiceStore} from '../../../../store/garage-service.store';
import {GarageServiceInterface} from '../../../../models/service/garage-service-response.interface';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';

type DialogData = {
  _id: string;
}

@Component({
  selector: 'mean-services-modal',
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatDialogActions,
    FormsModule,
    MatButton,
    MatDialogTitle,
    MatError,
    ReactiveFormsModule,
    MatDialogClose,
    TextFieldModule
  ],
  templateUrl: './garage-service-modal.component.html',
  styleUrl: './garage-service-modal.component.css'
})
export class GarageServiceModalComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<GarageServiceModalComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly serviceStore = inject(GarageServiceStore);

  actualService: GarageServiceInterface | null | undefined = null;

  protected serviceForm = this.formBuilder.nonNullable.group({
    name: ["", [Validators.required]],
    basePrice: [1, [Validators.required, Validators.min(0)]],
    description: ["", Validators.required]
  });

  ngOnInit(): void {
    this.actualService = this.serviceStore.services().find((service) => service._id === this.data._id);
    this.serviceForm.patchValue({
      name: this.actualService!.name,
      basePrice: this.actualService!.basePrice,
      description: this.actualService!.description
    });
  }

  clearForm() {
    this.serviceForm.reset();
  }

  updateService() {
    if (this.serviceForm.invalid) {
      return;
    }

    const formValues = this.serviceForm.getRawValue();

    const hasChanges =
      formValues.name !== this.actualService!.name ||
      formValues.basePrice !== this.actualService!.basePrice ||
      formValues.description !== this.actualService!.description;

    if (hasChanges) {
      this.serviceStore.updateService(this.actualService!._id, formValues);
    }

    this.dialogRef.close();
  }
}
