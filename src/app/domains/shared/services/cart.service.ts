import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cartProducts = this.cart();
    console.log('cartProducts', cartProducts);
    return cartProducts.reduce((total, product) => total + (product.price / 1) , 0);
  })

  constructor() {}

  addToCart(product: Product) {
    this.cart.update((prevState) => [...prevState, product]);
  }
}
