import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@shared/models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { TokenService } from './token.service';
import { MeService } from './me.service';
import { ResponseLogin } from '@shared/models/auth.model';
import { apiUrl } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private meService: MeService,
  ) { }

  getDataUser() {
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  getProfile() {
    return this.meService.getMeProfile()
    .pipe(
      tap(user => {
        this.user$.next(user);
      })
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}
