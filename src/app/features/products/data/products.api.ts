import { Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  productResource = resource({
    loader: async (): Promise<Product[]> => {
      // Simuler un délai de 4 secondes
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const response = await fetch(`${environment.apiBaseUrl}/product/all`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
  });
}
