import {Component, computed, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {GarageLink} from '../../models/sidebar/garage-link';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'garage-sidebar',
  imports: [
    MatIcon,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './garage-sidebar.component.html',
  styleUrl: './garage-sidebar.component.css'
})
export class GarageSidebarComponent {
  private authStore = inject(GarageAuthStore);

  logo = computed(() => {
    return environment.logo;
  });

  logout(){
    this.authStore.logout();
  }

  links: GarageLink[] = [
    {
      path: "/garage",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Accueil",
      icon: "home"
    },
    {
      path: "/garage/events",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Evenements",
      icon: "event"
    },
    {
      path: "/garage/services",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Services",
      icon: "home_repair_service"
    },
    {
      path: "/garage/mecanics",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Mecaniciens",
      icon: "groups"
    },
    {
      path: "/garage/historique",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Historique des prestations",
      icon: "history"
    }
  ]
}
