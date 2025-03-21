import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import { AddVehicleComponent } from '../../components/add.vehicle/add.vehicle.component';
import { VehicleStoreService } from '../../services/vehicle-store.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicule',
  imports: [PageHeaderComponent, MatCardModule, MatButtonModule, MatIconModule, VehicleCardComponent, MatProgressSpinnerModule],
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.css'
})
export class VehiculeComponent {
  private dialog = inject(MatDialog);
  private vehicleStore = inject(VehicleStoreService);
  vehicles = this.vehicleStore.getVehicles();
  isLoading = this.vehicleStore.loading();

  reloadData() {
    this.vehicleStore.fetchVehicles();
  }

  addNewVehicleDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    this.dialog.open(AddVehicleComponent, {
      maxWidth: 600,
      minWidth: 400,
      minHeight: 600
    });
  }
}

