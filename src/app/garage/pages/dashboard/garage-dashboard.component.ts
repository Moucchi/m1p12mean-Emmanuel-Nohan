import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {GarageDashboardStore} from '../../store/garage-dashboard.store';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {BaseChartDirective} from 'ng2-charts';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {CurrencyPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {MechanicAppointmentInterface} from '../../models/dashboard/mechanic-appointment-interface';
import {DateTime, Info} from 'luxon';
import {SetAppointmentDialogComponent} from '../modals/appointment/set/set.appointment.dialog.component';
import {AppointmentCompleteModalComponent} from '../modals/appointment/complete/appointment-complete.modal.component';
import {MatIcon} from '@angular/material/icon';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MonthlyAttendanceInterface} from '../../models/dashboard/monthly-attendance-interface';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentCardMeanComponent} from '../../components/appointment/mechanic/card/appointment-card.mean.component';

type GeneralInfo = {
  title: string,
  value: Signal<number>,
  currency?: boolean
}

@Component({
  standalone: true,
  selector: 'dashboard',
  imports: [
    VolaPipe, BaseChartDirective, MatIcon, SpinnerComponent, ReactiveFormsModule, FormsModule, AppointmentCardMeanComponent
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
  private formBuilder = inject(FormBuilder);

  searchForm = this.formBuilder.nonNullable.group(
    {
      year: [`${DateTime.now().year}`, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    }
  );

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
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      }
    }
  };
  pieChartLegend = true;

  pendingAppointments: MechanicAppointmentInterface[] = [];
  confirmedAppointments: MechanicAppointmentInterface[] = [];
  inProgressAppointments: MechanicAppointmentInterface[] = [];

  selectedCardType = 'pending';

  isAttendanceChartBlank = computed(() => {
    return this.dashboardStore.attendancePerMonth().length === 0;
  });

  isServicesChartBlank = computed(() => {
    return !this.dashboardStore.topServices() && this.dashboardStore.topServices().length > 0;
  });

  constructor() {

    this.updateGreetingText();

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

  updateGreetingText(): void {
    const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;
    let greeting = 'Bonsoir';

    if (currentHour >= 1 && currentHour < 12) {
      greeting = 'Bonjour';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Bon après-midi';
    }

    this.layoutStore.setText(`${greeting}, ${this.authStore.user()!.firstName}`);
  }

  ngOnInit(): void {
    if (this.authStore.isManager()) {
      this.dashboardStore.getDashboardData();
    }

    if (this.authStore.isMechanic()) {
      this.dashboardStore.getMechanicsAppointments();
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
            '#99bd00',
            '#e89700',
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
    this.setAppointmentDialog.open(AppointmentCompleteModalComponent, {
        data: {id: id},
        minWidth: "200px",
        maxWidth: "1200px",
      }
    )
  }

  updateAttendaceChartData(): void {
    const attendanceData: MonthlyAttendanceInterface[] = this.dashboardStore.attendancePerMonth();

    if (attendanceData && Array.isArray(attendanceData)) {
      try {
        const chartData: number[] = [];
        attendanceData.forEach(att => {
          chartData[att.month - 1] = att.totalPrestations;
        });

        this.lineChartData = {
          labels: Info.months('short'),
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
      } catch (e) {
        console.error('Erreur lors de la mise à jour des données du graphique', e);
      }
    }
  }

  getAttendanceByYear() {
    const year = this.searchForm.getRawValue().year;
    if (year && year.length === 4) {

      const yearValue = parseInt(year, 10);
      if (!isNaN(yearValue) && yearValue >= 2000) {
        this.dashboardStore.getAttendancePerMonth(yearValue);
      } else {
        this.dashboardStore.getAttendancePerMonth();
      }

    } else {
      this.dashboardStore.getAttendancePerMonth();
    }
  }
}
