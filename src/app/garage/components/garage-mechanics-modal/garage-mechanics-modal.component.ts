import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormFieldValidatorsService} from '../../../shared/services/form/form-field-validators.service';
import {GarageAuthStore} from "../../store/garage-auth.store";
import {MechanicStore} from '../../store/garage-mecanics.store';

@Component({
  selector: 'mean-garage-mechanics-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './garage-mechanics-modal.component.html',
  styleUrl: './garage-mechanics-modal.component.css'
})
export class GarageMechanicsModalComponent {
  readonly dialogRef = inject(MatDialogRef<GarageMechanicsModalComponent>);
  private readonly formFieldsValidators = inject(FormFieldValidatorsService);
  private formBuilder = inject(FormBuilder);
  protected readonly mechanicStore = inject(MechanicStore);

  mechanicsForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthday: ['', [Validators.required, this.formFieldsValidators.validateDate]],
    image: [null as File | null, [Validators.required, this.formFieldsValidators.validateImageFile]],
  });

  formSubmitted = false;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.mechanicsForm.patchValue({
        image: file
      });
    }
  }

  clearForm() {
    this.mechanicsForm.reset();
    this.formSubmitted = false;
  }

  private normalizeName(text: string): string {
    if (!text.trim()) return '';
    const temp = text.split(' ');

    const names = temp.map((name: string) => {
      const result = name.toLowerCase();
      return result.charAt(0).toUpperCase() + result.slice(1);
    })

    return names.join(' ');
  }

  addEmployee() {
    this.formSubmitted = true;

    Object.keys(this.mechanicsForm.controls).forEach(key => {
      this.mechanicsForm.get(key)?.markAsTouched();
    });

    if (this.mechanicsForm.valid) {
      const formValues = this.mechanicsForm.getRawValue();
      const firstName = this.normalizeName(formValues.firstName);
      const lastName = this.normalizeName(formValues.lastName);

      if (formValues.image) {
        const formData = new FormData();
        formData.append('image', formValues.image);
        formData.append('email', formValues.email);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('birthday', formValues.birthday);

        this.mechanicStore.register(formData);
        this.dialogRef.close();
      }

    }
  }
}
