import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardResponse } from '../../dtos/board.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  #jwtService = inject(JwtHelperService);
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/users`;

  getLoggedUser(): string {
    const { firstname, lastname } = this.#jwtService.decodeToken();

    return [firstname, lastname].join(' ');
  }

  getUserInitials(): string {
    const fullName = this.getLoggedUser();
    const [firstName, lastName] = fullName.split(/\s+/);

    return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  }

  findAllBoards(): Observable<BoardResponse[]> {
    return this.#http.get<BoardResponse[]>(`${this.#BASE_URL}/boards`);
  }
}
