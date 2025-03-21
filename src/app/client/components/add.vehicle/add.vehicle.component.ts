import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-add.vehicle',
  imports: [MatDialogContent, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './add.vehicle.component.html',
  styleUrl: './add.vehicle.component.css'
})
export class AddVehicleComponent {

}
