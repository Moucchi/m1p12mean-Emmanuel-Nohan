import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatCard,
  MatCardActions,
  MatCardContent
} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgOptimizedImage} from '@angular/common';
import {FormService} from '../../../shared/services/form/form.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: 'garage-login.component.html',
  styleUrl: 'garage-login.component.css'
})
export class GarageLoginComponent {
  private formBuilder = inject(FormBuilder);
  protected formService = inject(FormService)

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitForm(event: Event) {
    event.preventDefault();
    console.log(this.formGroup.value);
  }

  logo = 'logo/vroom.png';
}
