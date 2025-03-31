import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageServiceStore} from '../../store/garage-service.store';
import {GarageServiceInterface} from '../../models/service/garage-service-response.interface';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {CurrencyPipe, NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {GarageServiceModalComponent} from '../../components/garage-service-modal/garage-service-modal.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'mean-garage-service',
  imports: [
    VolaPipe,
    MatIcon,
    NgClass
  ],
  templateUrl: './garage-service.component.html',
  styleUrl: './garage-service.component.css',
  providers: [CurrencyPipe]
})
export class GarageServiceComponent implements OnInit {
  private readonly layoutStore = inject(LayoutStore);
  private readonly serviceStore = inject(GarageServiceStore);
  readonly updateDialog = inject(MatDialog);

  services: GarageServiceInterface[] = [];
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pagesArray: number[] = [];
  pageSize = 10;

  constructor() {
    effect(() => {
      this.updateService();
    });

    effect(() => {
      this.updatePagination();
    });
  }

  canShowPagination = computed(() => {
    return false;
  });

  ngOnInit(): void {
    this.layoutStore.setText("Services");
    this.serviceStore.getAllServices();
  }

  updateService() {
    this.services = this.serviceStore.services();
  }

  showServiceUpdateModal(id: string) {
    this.updateDialog.open(GarageServiceModalComponent, {
      data: {_id: id},
      width: "500px"
    });
  }

  updatePagination() {
    this.currentPage = this.serviceStore.page();
    this.totalPages = this.serviceStore.totalPages();
    this.totalItems = this.serviceStore.total();

    this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  nextPage() {

    this.serviceStore.nextPage();
  }

  previousPage() {
    this.serviceStore.previousPage();
  }

  goToPage(page: number) {
    this.serviceStore.goToPage(page);
  }

  protected readonly Math = Math;
}
