import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavComponent } from '../../components/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-welcome',
  imports: [FooterComponent, NavComponent, MatIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
