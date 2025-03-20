import {Component, ViewEncapsulation, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDivider,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  submitForm(event: Event) {
    event.preventDefault();
    console.log(this.formGroup.value);
  }

  isFieldInvalid(field: string) {
    const formControl = this.formGroup.get(field);
    return formControl?.invalid && (formControl.dirty || formControl?.touched);
  }

  clearFields() {
    this.formGroup.reset();
  }

  passwordMatch(): boolean {
    const password = this.formGroup.get('password')?.value;
    const confirmPassword = this.formGroup.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
