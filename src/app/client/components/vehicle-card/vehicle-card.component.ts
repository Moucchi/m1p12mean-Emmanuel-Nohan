import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vehicle-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {

}
