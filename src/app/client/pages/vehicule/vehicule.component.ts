import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig
} from '@angular/material/dialog';
import { AddVehicleComponent } from '../../components/add.vehicle/add.vehicle.component';

@Component({
  selector: 'app-vehicule',
  imports: [PageHeaderComponent, MatCardModule, MatButtonModule, MatIconModule, VehicleCardComponent],
  templateUrl: './vehicule.component.html',
  styleUrl: './vehicule.component.css'
})
export class VehiculeComponent {
  private dialog = inject(MatDialog);

  addNewVehicle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    this.dialog.open(AddVehicleComponent, {
      minWidth: 400,
      minHeight: 600
    });
  }
}

