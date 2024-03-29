import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cart = this.cartService.cart;

  isLoggedUser!: string | undefined;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.isLoggedUser = this.tokenService.getToken();
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
