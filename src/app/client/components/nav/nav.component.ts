import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {environment} from '../../../environments/environment.prod';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private authService = inject(AuthService);

  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout(){
    this.authService.logout();
  }

  logo = environment.logo;
}
