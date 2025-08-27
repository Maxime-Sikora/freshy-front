import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
          <a routerLink="/auth">Connexion</a>
          <a routerLink="/cart">Panier</a>
          <a routerLink="">Profil</a>
          <a routerLink="">Déconnexion</a>
        </nav>
      </div>
    </header>
  `,
  styles: `
    :host {
      position: sticky;
      top: 0;
    }
    header {
      background-color: var(--color-background);
    }
    .logo {
      width: 50px;
      height: 50px;
    }
    .navbar {
      display: flex;
      align-items: center;
      height: 7dvh;
    }
  `,
})
export class HeaderComponent {}
