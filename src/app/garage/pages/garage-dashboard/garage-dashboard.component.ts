import {Component, inject} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';

@Component({
  selector: 'garage-dashboard',
  imports: [],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  providers: [GarageDashboardStore]
})
export class GarageDashboardComponent {
  readonly dashboardStore = inject(GarageDashboardStore);
}
