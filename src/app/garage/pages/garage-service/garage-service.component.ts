import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {LayoutStore} from '../../store/garage-layout.store';
import {GarageServiceStore} from '../../store/garage-service.store';
import {GarageServiceInterface} from '../../models/service/garage-service-response.interface';
import {VolaPipe} from '../../../shared/pipe/vola.pipe';
import {CurrencyPipe, NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {GarageServiceModalComponent} from '../../components/garage-service-modal/garage-service-modal.component';
import {MatIcon} from '@angular/material/icon';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mean-garage-service',
  imports: [
    VolaPipe,
    MatIcon,
    NgClass,
    SpinnerComponent
  ],
  templateUrl: './garage-service.component.html',
  styleUrl: './garage-service.component.css',
  providers: [CurrencyPipe]
})
export class GarageServiceComponent implements OnInit {
  private readonly layoutStore = inject(LayoutStore);
  protected readonly serviceStore = inject(GarageServiceStore);
  readonly updateDialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);

  services: GarageServiceInterface[] = [];
  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pagesArray: number[] = [];
  pageSize = 10;

  constructor() {
    effect(() => {
      this.refreshService();
    });

    effect(() => {
      this.updatePagination();
    });

    effect(() => {
      this.showUpdateSnackBar();
    });
  }

  canShowPagination = computed(() => {
    return this.totalPages > 1;
  });

  ngOnInit(): void {
    this.layoutStore.setText("Services");
    this.serviceStore.getAllServices();
  }

  refreshService() {
    this.services = this.serviceStore.services();
  }

  showServiceUpdateModal(id: string) {
    this.updateDialog.open(GarageServiceModalComponent, {
      data: {_id: id},
      width: "500px"
    });
  }

  showUpdateSnackBar() {
    const errorMessage = this.serviceStore.error();
    const successMessage = this.serviceStore.success();

    if (errorMessage) {
      const snackbar = this.snackbar.open(errorMessage, 'Fermer', {duration: 3000});
      snackbar.afterDismissed().subscribe(() => this.serviceStore.resetRegisterMessage());
    } else if (successMessage) {
      const snackbar = this.snackbar.open(successMessage, 'Fermer', {duration: 3000});
      snackbar.afterDismissed().subscribe(() => this.serviceStore.resetRegisterMessage());
    }
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
