import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgOptimizedImage} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {FormService} from '../../../shared/services/form/form.service';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {environment} from '../../../environments/environment.prod';

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
  templateUrl: 'garage-mechanic-login.component.html',
  styleUrl: 'garage-mechanic-login.component.css'
})
export class GarageMechanicLoginComponent {
  private formBuilder = inject(FormBuilder);
  protected formService = inject(FormService)
  protected authStore = inject(GarageAuthStore);

  formGroup = this.formBuilder.nonNullable.group({
    email: ['oksamayami@gmail.com', [Validators.required, Validators.email]],
    password: ['994388', Validators.required],
  });

  submitForm(event: Event) {
    event.preventDefault();
    this.authStore.login(this.formGroup.getRawValue());
  }

  logo = environment.logo;
}
