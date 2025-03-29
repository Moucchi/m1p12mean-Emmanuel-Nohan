import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'mean-not-found',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  logo = environment.logo;
}
