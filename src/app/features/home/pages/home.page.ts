import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent],
  template: ` <app-hero /> `,
  styles: ``,
})
export class HomePage {}
