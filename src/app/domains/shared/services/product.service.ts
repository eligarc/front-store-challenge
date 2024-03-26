import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(category_id?: string) {
    const url = new URL('https://api-store-challenge-995bf154a855.herokuapp.com/api/v1/products');

    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getProduct(id: string) {
    return this.http.get<Product>(`https://api-store-challenge-995bf154a855.herokuapp.com/api/v1/products/${id}`);
  }
}
