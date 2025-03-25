import { Component, inject, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FooterComponent, FormsModule, RouterLink, SpinnerComponent],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);
  isLogin = signal<boolean>(false);
  user = { email: 'emmanuel.rdh.1979@gmail.com', password: 'test1234' };
  errorMessage = signal<string>('');

  ngOnInit(): void {
    if(localStorage.getItem('JWT_TOKEN')){
        this.router.navigateByUrl('/client/home');
    }
  }

  login(){
    this.isLogin.set(true);
    this.authService.login(this.user).subscribe({
      next: () => this.router.navigateByUrl('/client/home'),
      error: (error) => {
        this.errorMessage.set(error.error.error);
        this.isLogin.set(false);
      },
    });
  }
}
