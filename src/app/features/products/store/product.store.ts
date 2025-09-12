import { computed, inject, Injectable, resource } from '@angular/core';
import { ProductsApi } from '../data/products.api';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private productApi = inject(ProductsApi);

  productResource = resource<Product[] | null, HttpErrorResponse>({
    loader: async () => {
      try {
        return this.productApi.allProduct();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          return null;
        }
        throw error;
      }
    },
  });

  products = computed<Product[]>(() => this.productResource.value() ?? []);
  status = computed(() => this.productResource.status());
  error = computed(() => this.productResource.error());

  reload() {
    this.productResource.reload();
  }

  myProductResource = resource<Product[] | null, HttpErrorResponse>({
    loader: async () => {
      try {
        return await this.productApi.myProduct();
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          return null;
        }
        throw error;
      }
    },
  });

  myProducts = computed(() => this.myProductResource.value() ?? []);
  myProductStatus = computed(() => this.myProductResource.status());
  myProductIsLoading = computed(() => this.myProductResource.isLoading());
  myProductError = computed(() => this.myProductResource.error());
}
