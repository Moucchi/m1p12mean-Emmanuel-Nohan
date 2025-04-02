import { Component } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'mean-unauthorized',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  logo = environment.logo;
}
