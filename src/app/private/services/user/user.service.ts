import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtService = inject(JwtHelperService);

  getLoggedUser(): string {
    const { fullName } = this.jwtService.decodeToken();

    return fullName;
  }

  getUserInitials(): string {
    const fullName = this.getLoggedUser();
    const [firstName, lastName] = fullName.split(/\s+/);

    return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  }
}
