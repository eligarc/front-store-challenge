import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  apiUrl = 'https://api-store-challenge-995bf154a855.herokuapp.com';

  constructor(private http: HttpClient) {}

  getMeProfile() {
    return this.http.get<User>(`${this.apiUrl}/api/v1/me/profile`, {
      context: checkToken(),
    });
  }
}
