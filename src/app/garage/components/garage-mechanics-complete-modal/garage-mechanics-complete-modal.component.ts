import {Component, computed, inject, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {DialogData} from '../../../shared/models/dialog-data';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {MatError, MatInput, MatLabel} from '@angular/material/input';
import {QuillEditorComponent} from 'ngx-quill';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'mean-garage-mechanics-complete-modal',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    QuillEditorComponent,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    MatError
  ],
  templateUrl: './garage-mechanics-complete-modal.component.html',
  styleUrl: './garage-mechanics-complete-modal.component.css'
})
export class GarageMechanicsCompleteModalComponent {
  private readonly dialogRef = inject(MatDialogRef<GarageMechanicsCompleteModalComponent>);
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder);
  private readonly dashboardStore = inject(GarageDashboardStore);

  itemsArrayLength = signal<number>(0);

  isItemsAdded = computed(()=>{
    return this.itemsArrayLength() > 0 ;
  });

  form = this.formBuilder.nonNullable.group({
    files: [[] as File[], [Validators.required, this.validateMultipleFiles.bind(this)]],
    report: ['', Validators.required],
    items: this.formBuilder.array([])
  });

  get itemsArray() {
    return this.form.get('items') as FormArray;
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
    this.itemsArrayLength.set(this.itemsArray.length);
  }

  validateMultipleFiles(control: AbstractControl): ValidationErrors | null {
    const files = control.value as File[];
    if (!files || files.length === 0) return null;

    for (const file of files) {
      if (!(file instanceof File)) {
        return {invalidFile: true};
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return {invalidType: true};
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return {overSizedFile: true};
      }
    }

    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {

      this.form.patchValue({
        files: Array.from(input.files)
      });

      this.form.updateValueAndValidity();
    }
  }

  generateItem() {
    return this.formBuilder.group({
      id: [this.generateItemId()],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(-1)]]
    });
  }

  generateItemId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  addInputExtra(): void {
    this.itemsArray.push(this.generateItem());
    this.itemsArrayLength.set(this.itemsArray.length);
  }

  onSubmit(): void {

    this.form.updateValueAndValidity();

    const formValues = this.form.getRawValue();
    const formValue = new FormData();

    formValues.files!.forEach((file: File) => {
      formValue.append('files', file);
    });

    formValue.append('report', formValues.report);

    formValue.append('items', JSON.stringify(formValues.items));

    if( this.form.valid ){
      this.dashboardStore.markAppointmentAsCompleted(this.data.id, formValue);
    }

    this.dialogRef.close();
  }
}
