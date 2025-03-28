import { Component } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'mean-spinner',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

}
