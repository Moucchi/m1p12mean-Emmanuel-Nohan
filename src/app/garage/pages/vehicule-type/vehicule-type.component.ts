import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {LayoutStore} from '../../store/garage-layout.store';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {MatIcon} from '@angular/material/icon';
import {vehicleStore} from '../../store/VehicleStore';
import {TypeVoiture} from '../../../shared/models/type.interface';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeComponent} from '../../../shared/pages/add-type/add-type.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'mean-vehicule-type',
  imports: [
    SpinnerComponent,
    MatIcon
  ],
  templateUrl: './vehicule-type.component.html',
  styleUrl: './vehicule-type.component.css'
})
export class VehiculeTypeComponent implements OnInit{
  private readonly layoutStore = inject(LayoutStore);
  protected readonly typeStore = inject(vehicleStore);
  private addDialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

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

}
