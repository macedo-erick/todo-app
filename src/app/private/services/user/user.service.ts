import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly basePath = 'http://localhost:8080/api/dev/users';

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  find() {
    return this.http.get(this.basePath);
  }

  getUserInitials(): string {
    const fullName = this.getLoggedUser();

    const [firstname, lastname] = fullName.split(/\s+/);

    return firstname.charAt(0).concat(lastname.charAt(0));
  }

  getLoggedUser(): string {
    const { fullName } = this.jwtService.decodeToken();

    return fullName;
  }
}
