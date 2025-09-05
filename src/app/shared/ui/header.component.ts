import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="px-12 py-6">
      <div class="navbar">
        <div class="flex-auto flex">
          <img class="logo" src="/brand/freshyLogo.png" alt="Le logo de Freshy" />
          <p>Freshy</p>
        </div>
        <nav>
          <a routerLink="/">Acceuil</a>
          <a routerLink="/products">Produits</a>
          <a routerLink="">Producteurs</a>
          <a routerLink="">A propos</a>
          @if (auth.isAuthenticated()) {
            <a routerLink="/cart">Panier</a>
            <a routerLink="">Profil</a>
            <button class="link-like" (click)="signout()">Déconnexion</button>
          } @else {
            <a routerLink="/auth">Connexion</a>
          }
        </nav>
      </div>
    </header>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
    }
    .link-like {
      background: none;
      border: 0;
      margin: 0;
      font: inherit;
      color: inherit;
      cursor: pointer;
      text-decoration: none;
    }
    .link-like:hover {
      text-decoration: underline;
    }
    header {
      background-color: var(--color-surface);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    .logo {
      width: 75px;
      height: 75px;
      margin-left: 30px;
    }
    .navbar {
      display: flex;
      align-items: center;
      height: 7dvh;
    }
    p {
      font-size: 1.3rem;
    }
  `,
})
export class HeaderComponent {
  readonly auth = inject(AuthStore);
  private router = inject(Router);

  async signout() {
    this.auth.signout();
    await this.router.navigateByUrl('/');
  }
}
