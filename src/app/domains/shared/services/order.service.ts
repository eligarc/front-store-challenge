import { Injectable, inject } from '@angular/core';
import Toastify from 'toastify-js'

import { apiUrl } from '../../utils';
import { HttpClient } from '@angular/common/http';
import { ProductBasket } from '@shared/models/product.model';
import { checkToken } from '@shared/interceptors/token.interceptor';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cartService = inject(CartService);

  createOrder(cartProducts: ProductBasket[]) {
    return this.http.post(`${apiUrl}/api/v1/orders`, {}, {
      context: checkToken(),
    }).subscribe((newOrder: any) => {
      const parsedProducts = cartProducts.map((item) => ({
        orderId: newOrder.id,
        productId: item.id,
        name: item.name,
        price: item.price,
        amount: item.qty
      }));

      this.http.post(`${apiUrl}/api/v1/orders/add-items`,parsedProducts , {
        context: checkToken(),
      }).subscribe((newOrder) => {
        this.cartService.resetBasket();
        this.router.navigate(['/']);
        Toastify({
          text: "Tú compra se ha registrado exitosamente!🤩",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true,
          style: {
            background: "rgb(22 163 74);",
          },
          onClick: function(){}
        }).showToast();
      });
    });
  }
}
