import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageAuthStore} from '../../store/garage-auth.store';
import { CurrencyPipe} from '@angular/common';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';

type GeneralInfo = {
  title: string,
  value: Signal<number>,
  currency?: boolean
}

@Component({
  selector: 'garage-dashboard',
  imports: [
    VolaPipe
  ],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  providers: [GarageDashboardStore, CurrencyPipe]
})
export class GarageDashboardComponent implements OnInit {
  readonly dashboardStore = inject(GarageDashboardStore);
  readonly layoutStore = inject(LayoutStore);
  readonly authStore = inject(GarageAuthStore);

  ngOnInit(): void {
    const userName = `Bonjour, ${this.authStore.user()!.firstName}`
    this.layoutStore.setText(userName);

    this.dashboardStore.getDashboardData();
  }

  generalInfo: GeneralInfo[] = [
    {
      title: 'Note moyenne',
      value: computed(() => this.dashboardStore.averageRate())
    },
    {
      title: this.dashboardStore.upComingAppointment() > 1 ? 'Futurs rendez-vous' : 'Futur rendez-vous',
      value: computed(() => this.dashboardStore.upComingAppointment())
    },
    {
      title: this.dashboardStore.totalClients() > 2 ? 'Total clients' : 'Total clients',
      value: computed(() => this.dashboardStore.totalClients())
    },
    {
      title: 'Revenue de ce mois',
      value: computed(() => this.dashboardStore.actualMonthRevenue()),
      currency: true
    }
  ]

}

