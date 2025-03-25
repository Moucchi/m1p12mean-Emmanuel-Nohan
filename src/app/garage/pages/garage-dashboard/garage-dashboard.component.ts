import {Component, inject, OnInit} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageAuthStore} from '../../store/garage-auth.store';

@Component({
  selector: 'garage-dashboard',
  imports: [],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  providers: [GarageDashboardStore]
})
export class GarageDashboardComponent implements OnInit{
  readonly dashboardStore = inject(GarageDashboardStore);
  readonly layoutStore = inject(LayoutStore);
  readonly authStore = inject(GarageAuthStore);

  ngOnInit(): void {
    const userName = `Bonjour, ${this.authStore.user()!.firstName}`
    this.layoutStore.setText(userName);

    this.dashboardStore.getDashboardData();
  }


}
