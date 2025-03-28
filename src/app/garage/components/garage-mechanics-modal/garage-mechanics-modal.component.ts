import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormFieldValidatorsService} from '../../../shared/services/form/form-field-validators.service';
import {GarageMechanicsFormData} from '../../models/auth/garage-mechanics-form-data';
import {GarageAuthStore} from "../../store/garage-auth.store";

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
    protected readonly authStore = inject(GarageAuthStore);

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

            const imageControl = this.mechanicsForm.get('image');
            if (imageControl) {
                imageControl.markAsTouched();
                imageControl.updateValueAndValidity();
            }
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
                const mechanicData: GarageMechanicsFormData = {
                    email: formValues.email,
                    firstName: firstName,
                    lastName: lastName,
                    birthday: formValues.birthday,
                    image: formValues.image
                };

                this.authStore.register(mechanicData);
                this.dialogRef.close();
            }
        }
    }
}
