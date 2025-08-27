import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <section class="flex flex-col align-items-center justify-content-center gap-16">
      <h1>Des produits locaux, <br />directement du producteur</h1>
      <div class="flex flex-col align-items-center gap-16">
        <input type="text" placeholder="Rechercher un fruit, un légume ..." />
        <button class="btn btn-primary">Rechercher</button>
      </div>
    </section>
  `,
  styles: `
    section {
      height: 100dvh;
      margin-top: -7dvh;
    }
    h1 {
      text-align: center;
      font-size: 4rem;
    }
    input {
      width: 600px;
    }
  `,
})
export class HeroComponent {}
