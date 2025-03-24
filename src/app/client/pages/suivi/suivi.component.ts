import { Component, inject } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SuiviCardComponent } from '../../components/suivi-card/suivi-card.component';
import { SuiviStoreService } from '../../services/suivi-store.service';

@Component({
  selector: 'app-suivi',
  imports: [PageHeaderComponent, SuiviCardComponent],
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css'
})
export class SuiviComponent {
  suiviStoreService = inject(SuiviStoreService);
  suivi = this.suiviStoreService.getSuivi();
}
