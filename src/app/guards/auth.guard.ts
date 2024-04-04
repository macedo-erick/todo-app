import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (): boolean => {
  const jwtService = inject(JwtHelperService);
  const router = inject(Router);

  if (jwtService.isTokenExpired()) {
    void router.navigate(['']);
    return false;
  }

  return true;
};
