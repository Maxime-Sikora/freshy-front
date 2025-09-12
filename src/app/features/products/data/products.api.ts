import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  private http = inject(HttpClient);

  async allProduct(): Promise<Product[]> {
    return await firstValueFrom(this.http.get<Product[]>(`${environment.apiBaseUrl}/product/all`));
  }

  async myProduct(): Promise<Product[]> {
    return await firstValueFrom(
      this.http.get<Product[]>(`${environment.apiBaseUrl}/product/myProducts`),
    );
  }
}
