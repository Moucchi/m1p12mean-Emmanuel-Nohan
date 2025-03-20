import {Component, computed} from '@angular/core';
import {DateTime} from 'luxon';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-garage-layout',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './garage-layout.component.html',
  styleUrl: './garage-layout.component.css'
})
export class GarageLayoutComponent {
  links: number[] = Array.from({ length: 3 }, (_, i) => i);
  content: number[] = Array.from({ length: 30 }, (_, i) => i);

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

  logo = computed(() => {
    return 'logo/vroom.png';
  });
}
