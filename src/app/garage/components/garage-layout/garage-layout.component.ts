import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {GarageFooterComponent} from '../garage-footer/garage-footer.component';
import {RouterOutlet} from '@angular/router';
import {GarageSidebarComponent} from '../garage-sidebar/garage-sidebar.component';
import {GarageBreadcrumbComponent} from "../garage-breadcrumb/garage-breadcrumb.component";
import {LayoutStore} from '../../store/garage-layout.store';
import {environment} from '../../../environments/environment.prod';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-garage-layout',
  imports: [
    GarageFooterComponent,
    RouterOutlet,
    GarageSidebarComponent,
    GarageBreadcrumbComponent,
    MatIconModule
  ],
  templateUrl: './garage-layout.component.html',
  styleUrl: './garage-layout.component.css'
})
export class GarageLayoutComponent implements OnInit {
  readonly layoutStore = inject(LayoutStore);
  logo = environment.logo;

  // Signal pour contrôler la visibilité de la sidebar
  isSidebarOpen = signal<boolean>(false);

  ngOnInit() {
    // Initialiser l'état de la sidebar en fonction de la largeur d'écran actuelle
    this.isSidebarOpen.set(window.innerWidth >= 640);
  }

  // Écouter les changements de taille d'écran
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth >= 640) {
      this.isSidebarOpen.set(true);
    } else {
      this.isSidebarOpen.set(false);
    }
  }

  // Méthode pour basculer la visibilité de la sidebar
  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }
}
