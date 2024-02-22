import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { UserInitials } from '../../models/user-initials.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly basePath = 'http://localhost:8080/api/dev/users';

  constructor(private http: HttpClient) {}

  find() {
    return this.http.get(this.basePath);
  }

  getUserInitials(): Observable<UserInitials> {
    return this.http
      .get<UserInitials>(`${this.basePath}/initials`)
      .pipe(shareReplay());
  }
}
