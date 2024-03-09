import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly basePath = `${environment.apiBasePath}/users`;

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  find() {
    return this.http.get(this.basePath);
  }

  getUserInitials(): string {
    const fullName = this.getLoggedUser();
    const [firstName, lastName] = fullName.split(/\s+/);

    return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  }

  getLoggedUser(): string {
    const { fullName } = this.jwtService.decodeToken();

    return fullName;
  }
}
