import { Component, input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css'
})
export class SuccessAlertComponent {
  message = input<string>('');
}
