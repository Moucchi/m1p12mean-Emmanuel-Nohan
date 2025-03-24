import { Component, inject, Signal, signal } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SuiviCardComponent } from '../../components/suivi-card/suivi-card.component';
import { SuiviStoreService } from '../../services/suivi-store.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-suivi',
  imports: [PageHeaderComponent, SuiviCardComponent, MatIcon, MatButtonModule],
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css'
})
export class SuiviComponent {
  suiviStoreService = inject(SuiviStoreService);
  suivi = this.suiviStoreService.getSuivi();
  isRefreshing: Signal<boolean> = this.suiviStoreService.getRefresh();

  refreshData(){
    this.suiviStoreService.fetchSuivi();
  }
}
