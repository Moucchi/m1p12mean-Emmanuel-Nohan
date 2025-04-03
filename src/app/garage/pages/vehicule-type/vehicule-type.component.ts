import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {LayoutStore} from '../../store/garage-layout.store';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {vehicleStore} from '../../store/VehicleStore';
import {TypeVoiture} from '../../../shared/models/type.interface';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeComponent} from '../../../shared/pages/add-type/add-type.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmationDialogService} from '../../services/garage-confirmation-dialog/confirmation-dialog.service';
import {PercentPipe} from '@angular/common';

@Component({
  selector: 'mean-vehicule-type',
  imports: [
    SpinnerComponent,
    MatIcon,
    PercentPipe
  ],
  templateUrl: './vehicule-type.component.html',
  styleUrl: './vehicule-type.component.css'
})
export class VehiculeTypeComponent implements OnInit{
  private readonly layoutStore = inject(LayoutStore);
  protected readonly typeStore = inject(vehicleStore);
  private addDialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly confirmationDialog = inject(ConfirmationDialogService);

  types: TypeVoiture[] = [];

  constructor() {
    this.layoutStore.setText("Type de vehicule");

    effect(() => {
      this.refreshType();
    });

    effect(() => {
      this.showSnackBar();
    });
  }

  canShowTypeTable = computed(() => {
    return this.typeStore.vehicles() && this.typeStore.vehicles().length > 0
  });

  refreshType() {
    this.types = this.typeStore.vehicles();
  }

  ngOnInit(): void {
    this.typeStore.getAllTypes();
  }

  showAddTypeDialog() {
    this.addDialog.open(AddTypeComponent);
  }

  showSnackBar() {

    if( this.typeStore.snackMessage() ){
      const snackSubscription = this.snackBar.open(this.typeStore.snackMessage()!, 'Fermer', {
        duration: 3000,
        panelClass: ['snackbar']
      });

      snackSubscription.afterDismissed().subscribe({
        next : () => {
          this.typeStore.resetSnackMessage();
        }
      });
    }
  }

  deleteType(id: string) {
    this.confirmationDialog.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce type de voiture ?',
      onConfirm: () => {
        this.typeStore.deleteType(id);
      }
    });
  }

}
