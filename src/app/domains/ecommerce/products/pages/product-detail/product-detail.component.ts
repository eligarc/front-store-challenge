import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { CartComponent } from '@shared/components/cart/cart.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent {
  @Input() id?: string;

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | null>(null);

  ngOnInit() {
    if (this.id) {
      this.productService.getProduct(this.id).subscribe({
        next: (prod) => {
          this.product.set(prod);
        },
        error: () => {},
      });
    }
  }

  addToCart() {
    const product = this.product();

    if(product) {
      this.cartService.addToCart(product);
    }
  }
}
