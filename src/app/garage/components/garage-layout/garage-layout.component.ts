import {Component, inject} from '@angular/core';
import {GarageFooterComponent} from '../garage-footer/garage-footer.component';
import { RouterOutlet} from '@angular/router';
import {GarageSidebarComponent} from '../garage-sidebar/garage-sidebar.component';
import {GarageBreadcrumbComponent} from "../garage-breadcrumb/garage-breadcrumb.component";
import {LayoutStore} from '../../store/garage-layout.store';

@Component({
  selector: 'app-garage-layout',
    imports: [
        GarageFooterComponent,
        RouterOutlet,
        GarageSidebarComponent,
        GarageBreadcrumbComponent
    ],
  templateUrl: './garage-layout.component.html',
  styleUrl: './garage-layout.component.css'
})
export class GarageLayoutComponent{
  readonly layoutStore = inject(LayoutStore);
}
