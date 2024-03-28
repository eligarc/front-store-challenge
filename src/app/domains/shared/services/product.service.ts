import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { checkToken } from '@shared/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  apiUrl = 'https://api-store-challenge-995bf154a855.herokuapp.com';

  constructor() { }

  getProducts(category_id?: string) {
    const url = new URL(this.apiUrl + '/api/v1/products');

    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/api/v1/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${this.apiUrl}/api/v1/products`, product, {
      context: checkToken(),
    });
  }
}
