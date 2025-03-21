import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MarqueStoreService } from '../../services/marque-store.service';
import { TypeStoreService } from '../../services/type-store.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleStoreService } from '../../services/vehicle-store.service';

@Component({
  selector: 'app-add.vehicle',
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogTitle, MatButtonModule, MatDialogClose, PageHeaderComponent],
  templateUrl: './add.vehicle.component.html',
  styleUrl: './add.vehicle.component.css'
})
export class AddVehicleComponent {
  private marqueStore = inject(MarqueStoreService);
  private typeStore = inject(TypeStoreService);
  private ref = inject(MatDialogRef<AddVehicleComponent>);
  private fb = inject(FormBuilder);
  private vehicleStore = inject(VehicleStoreService);
  isDisabled = signal<boolean>(false);
  marques = this.marqueStore.getMarques();
  types = this.typeStore.getTypes();

  formGroup = this.fb.group({
    registrationNumber: ['', [Validators.required]],
    vehicleBrandId: ['', [Validators.required]],
    vehicleTypeId: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  close() {
    this.ref.close();
  }

  submit(event: Event){
    event.preventDefault();
    this.isDisabled.set(true);
    this.vehicleStore.addVehicle(this.formGroup.value);
    this.close();
  }
}
