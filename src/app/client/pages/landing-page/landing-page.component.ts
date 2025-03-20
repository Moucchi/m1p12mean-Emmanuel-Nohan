import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing-page',
  imports: [FooterComponent, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
