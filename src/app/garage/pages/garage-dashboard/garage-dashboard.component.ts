import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {CurrencyPipe} from '@angular/common';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {Info} from 'luxon';

type GeneralInfo = {
  title: string,
  value: Signal<number>,
  currency?: boolean
}

@Component({
  selector: 'garage-dashboard',
  imports: [
    VolaPipe, BaseChartDirective
  ],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  providers: [GarageDashboardStore, CurrencyPipe]
})
export class GarageDashboardComponent implements OnInit {
  readonly dashboardStore = inject(GarageDashboardStore);
  readonly layoutStore = inject(LayoutStore);
  readonly authStore = inject(GarageAuthStore);

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Visites par mois',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'oklch(0.577 0.245 27.325)'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  lineChartLegend = true;

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      }
    }
  };

  pieChartLegend = true;

constructor() {
  effect(() => {
    this.updateAttendaceChartData();
  });

  effect(() => {
    this.updateServicesPieChart();
  });
}

  ngOnInit(): void {
    const text = `Bonjour, ${this.authStore.user()!.firstName}`;
    this.layoutStore.setText(text);
    this.dashboardStore.getDashboardData();
  }

  updateAttendaceChartData(): void {
    const attendanceData = this.dashboardStore.attendancePerMonth();

    if (attendanceData && attendanceData.length > 0) {
      const months = Info.months('short');

      const chartData: number[] = [];

      attendanceData.forEach(attendance => {
        chartData[attendance.month - 1] = attendance.totalPrestations;
      });

      this.lineChartData = {
        labels: months,
        datasets: [
          {
            data: chartData,
            label: 'Visites par mois',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'oklch(0.577 0.245 27.325)'
          }
        ]
      };
    }
  }

  updateServicesPieChart(): void {
    const topServicesData = this.dashboardStore.topServices();

    if (topServicesData && topServicesData.length > 0) {
      this.pieChartData = {
        labels: topServicesData.map(service => service.name),
        datasets: [{
          data: topServicesData.map(service => service.count),
          backgroundColor: [
            '#E8000C',
            '#E80097',
            '#E82500'
          ]
        }]
      };
    }
  }

  generalInfo: GeneralInfo[] = [
    {
      title: 'Note moyenne',
      value: computed(() => this.dashboardStore.averageRate())
    },
    {
      title: 'Futurs rendez-vous',
      value: computed(() => this.dashboardStore.upComingAppointment())
    },
    {
      title: 'Total clients',
      value: computed(() => this.dashboardStore.totalClients())
    },
    {
      title: 'Revenue de ce mois',
      value: computed(() => this.dashboardStore.actualMonthRevenue()),
      currency: true
    }
  ]
}
