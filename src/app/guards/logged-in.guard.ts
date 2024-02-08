import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtHelperService)
  const router = inject(Router)

  if (!jwtService.isTokenExpired()) {
    void router.navigate(['/s/home'])
    return false;
  }

  return true;
};
