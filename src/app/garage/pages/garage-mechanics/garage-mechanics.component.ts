import {Component, effect, inject, OnInit} from '@angular/core';
import {LayoutStore} from '../../store/garage-layout.store';
import {MechanicStore} from '../../store/garage-mecanics.store';
import {Mechanics} from '../../models/mechanics/mechanics';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {GarageMechanicsModalComponent} from '../../components/garage-mechanics-modal/garage-mechanics-modal.component';

@Component({
  selector: 'mean-garage-mechanics',
  imports: [
    NgOptimizedImage,
    SpinnerComponent,
    NgClass,
    MatIcon
  ],
  templateUrl: './garage-mechanics.component.html',
  styleUrl: './garage-mechanics.component.css'
})
export class GarageMechanicsComponent implements OnInit {
  private readonly layoutStore = inject(LayoutStore);
  protected readonly mechanicStore = inject(MechanicStore);
  readonly dialog = inject(MatDialog);
  mechanics: Mechanics[] = [];

  currentPage = 0;
  totalPages = 0;
  totalItems = 0;
  pagesArray: number[] = [];

  constructor() {
    this.layoutStore.setText('Mécanicien');

    effect(() => {
      this.updateMechanics();
      this.updatePagination();
    });
  }

  ngOnInit(): void {
    this.mechanicStore.getAllMechanics();
  }

  showAddMechanicModal() {
    this.dialog.open(GarageMechanicsModalComponent, {});
  }

  updateMechanics() {
    this.mechanics = this.mechanicStore.mechanics();
  }

  updatePagination() {
    this.currentPage = this.mechanicStore.page();
    this.totalPages = this.mechanicStore.totalPage();
    this.totalItems = this.mechanicStore.total();

    this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  nextPage() {
    this.mechanicStore.nextPage();
  }

  previousPage() {
    this.mechanicStore.previousPage();
  }

  goToPage(page: number) {
    this.mechanicStore.goToPage(page);
  }

  protected readonly Math = Math;
}
