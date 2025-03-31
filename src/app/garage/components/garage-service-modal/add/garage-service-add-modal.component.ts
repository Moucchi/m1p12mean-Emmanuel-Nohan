import {Component, inject} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInput, MatLabel} from "@angular/material/input";
import {GarageServiceStore} from '../../../store/garage-service.store';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {GarageServiceModalComponent} from '../update/garage-service-modal.component';


type DialogData = {
  _id: string;
}

@Component({
  selector: 'mean-garage-service-add-modal',
  imports: [
    CdkTextareaAutosize,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './garage-service-add-modal.component.html',
  styleUrl: './garage-service-add-modal.component.css'
})
export class GarageServiceAddModalComponent {
  private readonly dialogRef = inject(MatDialogRef<GarageServiceModalComponent>);
  private formBuilder = inject(FormBuilder);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly serviceStore = inject(GarageServiceStore);

  protected serviceForm = this.formBuilder.nonNullable.group({
    name: ["", [Validators.required]],
    basePrice: [1, [Validators.required, Validators.min(0)]],
    description: ["", Validators.required]
  });

  addService(){
    if( this.serviceForm.valid ){
      this.serviceStore.createService(this.serviceForm.getRawValue());
    }

    this.dialogRef.close();
  }

  clearForm() {
    this.serviceForm.reset();
  }
}
