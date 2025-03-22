import {Component, computed} from '@angular/core';
import {DateTime} from 'luxon';
import {GarageFooterComponent} from '../garage-footer/garage-footer.component';
import { RouterOutlet} from '@angular/router';
import {GarageSIdebarComponent} from '../garage-sidebar/garage-sidebar.component';

@Component({
  selector: 'app-garage-layout',
  imports: [
    GarageFooterComponent,
    RouterOutlet,
    GarageSIdebarComponent
  ],
  templateUrl: './garage-layout.component.html',
  styleUrl: './garage-layout.component.css'
})
export class GarageLayoutComponent {
  text = computed(() => {
    const hour = DateTime.now().hour;

    if (hour >= 0 && hour < 12) {
      return 'Bonjour';
    } else if (hour >= 12 && hour < 18) {
      return 'Bon après-midi';
    } else {
      return 'Bonsoir';
    }
  });
}
