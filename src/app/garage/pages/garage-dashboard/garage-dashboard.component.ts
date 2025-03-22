import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {GarageBreadcrumbComponent} from '../../components/garage-breadcrumb/garage-breadcrumb.component';

@Component({
  selector: 'app-garage-dashboard',
  imports: [
    MatIcon,
    GarageBreadcrumbComponent,
  ],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css'
})
export class GarageDashboardComponent {

}
