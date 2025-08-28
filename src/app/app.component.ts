import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/header.component';
import { FooterComponent } from './shared/ui/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="app-main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--color-background);
    }
    .app-main {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
  `,
})
export class AppComponent {
  title = 'freshy-front';
}
