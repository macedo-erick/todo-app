import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tokenGetter} from '../app.module';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtHelperService)

  if(!jwtService.isTokenExpired()) {
    req = req.clone({
      headers: req.headers.set('Authorization', tokenGetter() as string)
    })
  }

  return next(req);
};
