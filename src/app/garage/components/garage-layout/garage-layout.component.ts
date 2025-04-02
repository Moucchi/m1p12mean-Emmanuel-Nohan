import {Component, inject, OnInit, signal, OnDestroy} from '@angular/core';
import {GarageFooterComponent} from '../garage-footer/garage-footer.component';
import {RouterOutlet} from '@angular/router';
import {GarageSidebarComponent} from '../garage-sidebar/garage-sidebar.component';
import {GarageBreadcrumbComponent} from "../garage-breadcrumb/garage-breadcrumb.component";
import {LayoutStore} from '../../store/garage-layout.store';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-garage-layout',
  imports: [
    GarageFooterComponent,
    RouterOutlet,
    GarageSidebarComponent,
    GarageBreadcrumbComponent,
  ],
  templateUrl: './garage-layout.component.html',
  styleUrl: './garage-layout.component.css'
})
export class GarageLayoutComponent implements OnInit, OnDestroy {
  readonly layoutStore = inject(LayoutStore);
  private breakpointObserver = inject(BreakpointObserver);
  isLargeScreen = signal(false);
  showSidebar = signal(false);
  logo = environment.logo;

  private breakpointSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(min-width: 1440px)'])
      .subscribe(result => {
        this.isLargeScreen.set(result.matches);
        this.showSidebar.set(result.matches);
      });
  }

  ngOnDestroy(): void {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  toggleSidebar(): void {
    this.showSidebar.update(value => !value);
  }
}
