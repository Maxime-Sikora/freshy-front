import { Component, computed, inject } from '@angular/core';
import { ProductStore } from '../store/product.store';

@Component({
  selector: 'app-products',
  imports: [],
  template: `
    <section class="container">
      <h2>Produits de nos producteurs</h2>
      <div class="products-grid">
        <ul>
          @for (product of products(); track product.id) {
            <li>Nom du produit : {{ product.productName }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: ``,
})
export class ProductsComponent {
  private productStore = inject(ProductStore);

  products = computed(() => this.productStore.products());
}
