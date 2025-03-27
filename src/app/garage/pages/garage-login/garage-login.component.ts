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
import {GarageAuthStore} from '../../store/garage-auth.store';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {environment} from '../../../environments/environment.prod';
import {SpinnerComponent} from '../../components/spinner/spinner.component';

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
    NgClass,
    SpinnerComponent
  ],
  templateUrl: 'garage-login.component.html',
  styleUrl: 'garage-login.component.css'
})
export class GarageLoginComponent {
  private formBuilder = inject(FormBuilder);
  protected formService = inject(FormService)
  protected authStore = inject(GarageAuthStore);

  formGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitForm(event: Event) {
    event.preventDefault();
    this.authStore.login(this.formGroup.getRawValue());
  }

  logo = environment.logo;
}
