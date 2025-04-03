import { Component, inject, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-inscription',
  imports: [SpinnerComponent, FooterComponent, RouterLink, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  logo = environment.logo;

  errorMessage = signal('');
  submit = signal(false);

  signupForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(event: Event){
    event.preventDefault();
    if(this.signupForm.valid){
      this.submit.set(true);
      this.http.post(`${environment.apiUrl}/api/clients/register`, this.signupForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('JWT_TOKEN', response.token);
          this.router.navigateByUrl('/client/home');
        },
        error: (error) => {
          this.errorMessage.set(error.error.error || 'An error occurred. Please try again later.');
          this.submit.set(false);
        }
      });
    }

  }


}
