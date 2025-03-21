import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Vehicle } from '../../../shared/models/vehicle.inteface';

@Component({
  selector: 'app-vehicle-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  vehicle = input<Vehicle>();
}
