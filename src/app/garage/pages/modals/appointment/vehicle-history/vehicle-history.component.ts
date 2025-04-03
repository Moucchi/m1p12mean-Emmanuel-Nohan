import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../../../../../shared/models/dialog-data';
import {VehicleHistoryService} from '../../../../services/history/vehicle-history.service';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'mean-vehicle-history',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './vehicle-history.component.html',
  styleUrl: './vehicle-history.component.css'
})
export class VehicleHistoryComponent {
  protected data = inject<DialogData>(MAT_DIALOG_DATA);
  private service = inject(VehicleHistoryService);

  history$ = this.service.getCarHistory(this.data.id);

  getImageUrl(img: string){
    return environment.apiUrl + '/uploads/' + img;
  }
}
