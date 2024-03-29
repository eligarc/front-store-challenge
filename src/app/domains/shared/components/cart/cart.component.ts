import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductBasket } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { OrderService } from '@shared/services/order.service';
import { TokenService } from '@shared/services/token.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  cart = this.cartService.cart;
  subTotal = this.cartService.total;

  toggleSideMenu() {
    this.hideSideMenu.update((prevState) => !prevState);
  }

  deleteToCart(product: ProductBasket) {
    this.cartService.deleteToCart(product);
  }

  increaseQuantity(product: ProductBasket) {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: ProductBasket) {
    this.cartService.decreaseQuantity(product);
  }

  createOrder() {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.orderService.createOrder(this.cart());
  }
}
