import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@shared/services/token.service';
import { Observable } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
  const cookieService = inject(TokenService);
  if (req.context.get(CHECK_TOKEN)) {
    const isValidToken = cookieService.isValidToken();
    if (isValidToken) {
      const accessToken = cookieService.getToken();
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return next(cloned);
    } else {
      return next(req);
    }
  }

  return next(req);
};
