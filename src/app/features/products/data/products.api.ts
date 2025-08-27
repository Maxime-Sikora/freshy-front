import { Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  productResource = resource({
    loader: async (): Promise<Product[]> =>
      (await fetch(`${environment.apiBaseUrl}/product/all`)).json(),
  });
}
