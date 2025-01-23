import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PrincipalComponent } from '../principal/principal.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, PrincipalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
