import { Injectable, inject } from '@angular/core';
import { apiUrl } from '../../utils';
import { HttpClient } from '@angular/common/http';
import { ProductBasket } from '@shared/models/product.model';
import { checkToken } from '@shared/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);

  constructor() { }

  createOrder(cartProducts: ProductBasket[]) {
    return this.http.post(`${apiUrl}/api/v1/orders`, {}, {
      context: checkToken(),
    }).subscribe((newOrder: any) => {
      console.log(newOrder);
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
        console.log(newOrder);
      });
    });
  }
}
