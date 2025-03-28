import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FormFieldValidatorsService} from '../../../shared/services/form/form-field-validators.service';
import {GarageMechanicsFormData} from '../../models/auth/garage-mechanics-form-data';

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

    mechanicsForm = this.formBuilder.group<{
        email: FormControl<string>;
        firstName: FormControl<string>;
        lastName: FormControl<string>;
        phone: FormControl<string>;
        birthday: FormControl<string>;
        image: FormControl<File | null>;
    }>({
        email: this.formBuilder.control('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
        firstName: this.formBuilder.control('', {nonNullable: true, validators: [Validators.required]}),
        lastName: this.formBuilder.control('', {nonNullable: true, validators: [Validators.required]}),
        phone: this.formBuilder.control('', {nonNullable: true, validators: [Validators.required]}),
        birthday: this.formBuilder.control('', {
            nonNullable: true,
            validators: [Validators.required, this.formFieldsValidators.validateDate]
        }),
        image: this.formBuilder.control<File | null>(null)
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
                imageControl.setValidators([
                    Validators.required,
                    this.formFieldsValidators.validateImageFile
                ]);
                imageControl.updateValueAndValidity();
            }
        }
    }

    clearForm() {
        this.mechanicsForm.reset();
        this.formSubmitted = false;
    }

    addEmployee() {
        this.formSubmitted = true;

        const imageControl = this.mechanicsForm.get('image');
        if (imageControl) {
            imageControl.setValidators([
                Validators.required,
                this.formFieldsValidators.validateImageFile
            ]);
            imageControl.updateValueAndValidity();
        }

        if (this.mechanicsForm.valid) {
            console.log(this.mechanicsForm.value);
            this.dialogRef.close(this.mechanicsForm.value as GarageMechanicsFormData);
        }
    }
}
