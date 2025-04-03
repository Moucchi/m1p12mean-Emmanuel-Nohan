import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {CurrencyPipe} from '@angular/common';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {Info} from 'luxon';
import {MatDialog} from '@angular/material/dialog';
import {
  SetAppointmentDialogComponent
} from '../../components/garage-mechanics-dashboard-dialog/set-appointment-dialog/set-appointment-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MechanicAppointmentInterface} from '../../models/dashboard/mechanic-appointment-interface';
import {
  AppointmentCardComponent
} from '../../components/garage-mechanics-dashboard-dialog/appointment-card/appointment-card.component';
import {
  GarageMechanicsCompleteModalComponent
} from '../../components/garage-mechanics-complete-modal/garage-mechanics-complete-modal.component';

type GeneralInfo = {
  title: string,
  value: Signal<number>,
  currency?: boolean
}

@Component({
  standalone: true,
  selector: 'garage-dashboard',
  imports: [
    VolaPipe, BaseChartDirective, AppointmentCardComponent
  ],
  templateUrl: './garage-dashboard.component.html',
  styleUrl: './garage-dashboard.component.css',
  providers: [CurrencyPipe]
})
export class GarageDashboardComponent implements OnInit {
  readonly dashboardStore = inject(GarageDashboardStore);
  readonly layoutStore = inject(LayoutStore);
  readonly authStore = inject(GarageAuthStore);
  readonly setAppointmentDialog = inject(MatDialog);
  readonly appointmentSnackbar = inject(MatSnackBar);
  readonly completeAppointmentDialog = inject(MatDialog);

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

  pendingAppointments: MechanicAppointmentInterface[] = [];
  setAppointments: MechanicAppointmentInterface[] = [];
  confirmedAppointments: MechanicAppointmentInterface[] = [];
  inProgressAppointments: MechanicAppointmentInterface[] = [];

  selectedCardType = 'pending';

  isAttendanceChartBlank = computed(() => {
    return this.dashboardStore.attendancePerMonth() && this.dashboardStore.attendancePerMonth().length > 0;
  });

  isServicesChartBlank = computed(() => {
    return this.dashboardStore.topServices() && this.dashboardStore.topServices().length > 0;
  });

  constructor() {
    this.layoutStore.setText(`Bonjour, ${this.authStore.user()!.firstName}`);

    effect(() => {
      this.updateAttendaceChartData();
    });

    effect(() => {
      this.updateServicesPieChart();
    });

    effect(() => {
      this.showAppointmentSnackbar();
    });

    effect(() => {
      this.refreshAppointments();
    });

  }

  ngOnInit(): void {
    if (this.authStore.isManager()) {
      this.dashboardStore.getDashboardData();
    }

    if (this.authStore.isMechanic()) {
      this.dashboardStore.getMechanicsAppointments();
    }
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

  setAppointmentDate(id: string) {
    this.setAppointmentDialog.open(SetAppointmentDialogComponent, {
      data: {id: id},
      width: "500px"
    });
  }

  showAppointmentSnackbar() {
    const message = this.dashboardStore.appointmentMessage();
    if (message) {
      const snackbar = this.appointmentSnackbar.open(message, 'Fermer', {duration: 3000});
      snackbar.afterDismissed().subscribe(() => this.dashboardStore.resetAppointmentMessage());
    }
  }

  refreshAppointments() {
    const appointments = this.dashboardStore.mechanicsAppointments() ?? {};
    this.pendingAppointments = appointments.pending ?? [];
    this.setAppointments = appointments.set ?? [];
    this.confirmedAppointments = appointments.confirmed ?? [];
    this.inProgressAppointments = appointments.in_progress ?? [];
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

  markAsInProgress(id: string) {
    this.dashboardStore.markAppointmentAsInProgress(id);
  }

  markAsCompleted(id: string) {
    this.setAppointmentDialog.open(GarageMechanicsCompleteModalComponent, {
      data: {id: id},
      width: "500px"
    });  }
}
