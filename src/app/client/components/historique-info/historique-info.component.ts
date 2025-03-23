import { Component, inject } from '@angular/core';
import { MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HistoryItem } from '../../../shared/models/historique-appointment.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-historique-info',
  imports: [MatDialogClose, MatIconModule, MatButtonModule],
  templateUrl: './historique-info.component.html',
  styleUrl: './historique-info.component.css'
})
export class HistoriqueInfoComponent {
  data: HistoryItem = inject(MAT_DIALOG_DATA);

  getImageUrl(img: string){
    return environment.apiUrl + '/uploads/' + img;
  }

}
