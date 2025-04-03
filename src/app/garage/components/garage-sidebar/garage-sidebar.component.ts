import {Component, effect, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {GarageLink} from '../../models/sidebar/garage-link';
import {GarageAuthStore} from '../../store/garage-auth.store';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'garage-sidebar',
  standalone: true,
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
  authStore = inject(GarageAuthStore);
  role = signal<string>("");
  logo = environment.logo;

  logout() {
    this.authStore.logout();
  }

  constructor() {
    effect(() => {
      this.role.set(this.authStore.user()!.role);
    });
  }

  links: GarageLink[] = [
    {
      path: "/garage",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Accueil",
      icon: "home",
      role: ['manager', 'mechanics']
    },
    {
      path: "/garage/events",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Evenements",
      icon: "event",
      role: ['manager', 'mechanics']
    },
    {
      path: "/garage/services",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Services",
      icon: "home_repair_service",
      role: ['manager']
    },
    {
      path: "/garage/mecanics",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Mecaniciens",
      icon: "groups",
      role: ['manager']
    },
    {
      path: "/garage/types",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Type de vehicule",
      icon: "directions_car",
      role: ['manager']
    },
    {
      path: "/garage/historique",
      activeStyle: "active-link",
      activeOptions: {
        exact: true
      },
      title: "Historique des prestations",
      icon: "history",
      role: ['manager']
    }
  ]
}
