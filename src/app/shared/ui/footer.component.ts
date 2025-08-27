import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <p>Copyright Arkios 2025-2026</p>
    </footer>
  `,
  styles: `
    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary-dark);
      color: white;
    }
  `,
})
export class FooterComponent {}
