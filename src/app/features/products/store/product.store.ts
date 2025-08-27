import { computed, inject, Injectable } from '@angular/core';
import { ProductsApi } from '../data/products.api';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private productApi = inject(ProductsApi);

  products = computed<Product[]>(() => this.productApi.productResource.value() ?? []);
  status = computed(() => this.productApi.productResource.status());
  error = computed(() => this.productApi.productResource.error());

  reload() {
    this.productApi.productResource.reload();
  }
}
