import { Injectable, computed, signal } from '@angular/core';
import { Product, ProductBasket } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<ProductBasket[]>([]);
  total = computed(() => {
    const cartProducts = this.cart();
    return cartProducts.reduce(
      (total, product) => total + (product.price / 1 * product.qty),
      0
    );
  });

  constructor() {}

  addToCart(product: Product) {
    this.cart.update((prevState) => {
      const existingProductIndex = prevState.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevState];
        updatedCart[existingProductIndex].qty++;
        return updatedCart;
      } else {
        return [...prevState, { ...product, qty: 1, subtotal: product.price / 1 }];
      }
    });
  }

  increaseQuantity(product: Product) {
    this.cart.update((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === product.id && item.qty <= item.quantity) {
          const qty = item.qty + 1;
          return { ...item, qty, subtotal: product.price * qty };
        }
        return item;
      });
      return updatedCart;
    });
  }

  decreaseQuantity(product: Product) {
    this.cart.update((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === product.id && item.qty > 1) {
          const qty = item.qty - 1;
          return { ...item, qty,  subtotal: product.price * qty };
        }
        return item;
      });
      return updatedCart;
    });
  }

  deleteToCart(product: Product) {
    this.cart.update((prevState) => {
      return prevState.filter((item) => item.id !== product.id);
    });
  }

  resetBasket() {
    this.cart.set([]);
  }
}
