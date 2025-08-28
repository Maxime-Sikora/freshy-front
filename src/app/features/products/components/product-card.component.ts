import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div class="card">
      <img [src]="" [alt]="product().productName" />
      <h3>{{ product().productName }}</h3>
      <p>{{ product().description }}</p>
      <p class="price">{{ product().price }}</p>
      <button class="btn btn-primary">Ajouter au panier</button>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
