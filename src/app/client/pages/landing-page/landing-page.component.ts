import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [FooterComponent, MatIconModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
