import {DatePipe, NgOptimizedImage} from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Appointment } from '../../../shared/models/appointment.interface';
import { SuiviStoreService } from '../../services/suivi-store.service';
import {VehicleStoreService} from '../../services/vehicle-store.service';


@Component({
  selector: 'app-suivi-card',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './suivi-card.component.html',
  styleUrl: './suivi-card.component.css'
})
export class SuiviCardComponent {
  private suiviStore = inject(SuiviStoreService);
  private vehicleStore = inject(VehicleStoreService)
  title = input();
  state = input<string>('');
  data = input<Appointment[]>();
  isProcessing = this.suiviStore.getProcessing();

  cancel(id: string, index: number) {
    this.suiviStore.cancelAppointment(id, index, this.state());
    this.vehicleStore.fetchVehicles();
  }

  confirm(id: string, index: number) {
    this.suiviStore.confirmAppointment(id, index);
  }

  getStateColor() {
    switch (this.state()) {
      case 'pending':
        return '#FFC107';
      case 'set':
        return '#2196F3	';
      case 'confirmed':
        return '#4CAF50';
      default:
        return '#FF9800';
    }
  }
}
