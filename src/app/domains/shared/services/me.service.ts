import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';
import { apiUrl } from '../../utils';

@Injectable({
  providedIn: 'root',
})
export class MeService {

  constructor(private http: HttpClient) {}

  getMeProfile() {
    return this.http.get<User>(`${apiUrl}/api/v1/me/profile`, {
      context: checkToken(),
    });
  }
}
