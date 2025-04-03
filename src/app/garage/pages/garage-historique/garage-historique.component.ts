import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {CompletedAppointmentStore} from '../../store/AppointmentHistory.store';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {LayoutStore} from '../../store/garage-layout.store';
import {CompletedAppointment, CompletedAppointmentItem} from '../../models/appointment/history/completed-appointment';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';

@Component({
  selector: 'mean-garage-historique',
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
export class GarageHistoriqueComponent implements OnInit{
  protected readonly store = inject(CompletedAppointmentStore);
  private readonly layoutStore = inject(LayoutStore);
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
  }

  canShowHistoryTable = computed(() => {
    return this.store.appointments() && ( this.store.appointments()?.length ?? 0 > 0 )
  });

  canShowPagination = computed(() => {
    return this.store.totalPages() >= 2;
  });

  ngOnInit(): void {
    this.store.getAllCompletedAppointment();
  }

  updateAppointments(){
    this.appointments = this.store.appointments()!;
  }

  getTotal( items : CompletedAppointmentItem[] ){
    let result = 0;

    for (let i = 0; i <  items.length ; i++) {
        result += ( items[i].qty * items[i].price );
    }

    return result;
  }

  protected readonly Math = Math;
}
