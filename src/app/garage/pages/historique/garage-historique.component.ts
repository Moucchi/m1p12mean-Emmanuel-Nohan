import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {CompletedAppointmentStore} from '../../store/AppointmentHistory.store';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {LayoutStore} from '../../store/garage-layout.store';
import {CompletedAppointment, CompletedAppointmentItem} from '../../models/appointment/history/completed-appointment';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {HistoryService} from '../../services/history/history.service';
import {MatDialog} from '@angular/material/dialog';
import {ReportComponent} from '../modals/appointment/report/report.component';

@Component({
  selector: 'mean-historique',
  imports: [
    MatIcon,
    SpinnerComponent,
    NgClass,
    DatePipe,
    VolaPipe
  ],
  templateUrl: './garage-historique.component.html',
  styleUrl: './garage-historique.component.css',
  providers: [CurrencyPipe, VolaPipe]
})
export class GarageHistoriqueComponent implements OnInit {
  protected readonly store = inject(CompletedAppointmentStore);
  private readonly layoutStore = inject(LayoutStore);
  private readonly historyService = inject(HistoryService);
  private readonly dialog = inject(MatDialog);

  appointments: CompletedAppointment[] = [];

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pagesArray: number[] = [];

  constructor() {
    this.layoutStore.setText('Historique des prestations');

    effect(() => {
      this.updateAppointments();
    });

    effect(() => {
      this.updatePagination();
    });

  }

  canShowHistoryTable = computed(() => {
    return this.store.appointments() && (this.store.appointments()?.length ?? 0 > 0)
  });

  canShowPagination = computed(() => {
    return this.store.totalPages() >= 2;
  });

  ngOnInit(): void {
    this.store.getAllCompletedAppointment();
  }

  updateAppointments() {
    this.appointments = this.store.appointments()!;
  }

  getTotal(items: CompletedAppointmentItem[]) {
    let result = 0;

    for (let i = 0; i < items.length; i++) {
      result += (items[i].qty * items[i].price);
    }

    return result;
  }

  searchPrestation($event: Event) {
    const searchValue = ($event.target as HTMLInputElement).value.toLowerCase().trim();

    if (searchValue === '') {
      this.store.getAllCompletedAppointment();
      return;
    }

  }

  updatePagination() {
    this.currentPage = this.store.page();
    this.totalPages = this.store.totalPages();
    this.totalItems = this.store.total();

    this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  nextPage() {
    this.store.nextPage();
  }

  previousPage() {
    this.store.previousPage();
  }

  goToPage(page: number) {
    this.store.goToPage(page);
  }

  protected readonly Math = Math;

  getinvoice(_id: string) {
    this.historyService.downloadInvoice(_id);
  }

  showReport(_id: string) {
    const appointment = this.appointments.find(appointment => appointment._id === _id);

    this.dialog.open(ReportComponent, {
      data: {
        appointment
      },
      width: "90%",
      maxWidth: "1500px",
      height: "90%",
      maxHeight: "900px",
      panelClass: "report-dialog-container"
    });
  }
}
