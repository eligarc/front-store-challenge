import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { checkToken } from '@shared/interceptors/token.interceptor';
import { apiUrl } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(category_id?: string) {
    const url = new URL(apiUrl + '/api/v1/products');

    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${apiUrl}/api/v1/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${apiUrl}/api/v1/products`, product, {
      context: checkToken(),
    });
  }
}
