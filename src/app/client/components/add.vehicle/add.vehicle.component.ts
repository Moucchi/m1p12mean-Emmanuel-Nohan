import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MarqueStoreService } from '../../services/marque-store.service';
import { TypeStoreService } from '../../services/type-store.service';

@Component({
  selector: 'app-add.vehicle',
  imports: [MatDialogContent, MatDialogTitle, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './add.vehicle.component.html',
  styleUrl: './add.vehicle.component.css'
})
export class AddVehicleComponent {
  private marqueStore = inject(MarqueStoreService);
  private typeStore = inject(TypeStoreService);
  marques = this.marqueStore.getMarques();
  types = this.typeStore.getTypes();
}
