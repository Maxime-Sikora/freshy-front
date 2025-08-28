import { Component, computed, inject, ResourceStatus } from '@angular/core';
import { ProductStore } from '../store/product.store';
import { ProductCardComponent } from '../components/product-card.component';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  template: `
    <section class="container">
      <h2>Produits de nos producteurs</h2>
      @switch (status()) {
        @case (ResourceStatus.Loading) {
          <p>Simulation de chargement de 4 seconde...</p>
        }
        @case (ResourceStatus.Error) {
          <p>Une erreur est survenue : {{ error() }}</p>
        }
        @default {
          <div class="grid">
            @for (p of products(); track p.id) {
              <app-product-card [product]="p" />
            } @empty {
              <p>Aucun produit.</p>
            }
          </div>
        }
      }
    </section>
  `,
  styles: `
    :host {
      min-height: 100dvh;
    }
    h2 {
      margin: 25px 0;
    }
  `,
})
export class ProductsPage {
  private productStore = inject(ProductStore);
  protected readonly ResourceStatus = ResourceStatus;

  products = computed(() => this.productStore.products());
  status = computed(() => this.productStore.status());
  error = computed(() => this.productStore.error());
}
