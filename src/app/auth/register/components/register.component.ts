import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormService} from '../../../shared/services/form/form.service';

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
  protected formService = inject(FormService);

  formGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  passwordMatch(){
    return this.formService.fieldsMatch('password', 'confirmPassword', this.formGroup);
  }

}
