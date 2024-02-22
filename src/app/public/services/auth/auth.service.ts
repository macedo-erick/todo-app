import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SigninRequest, SigninResponse } from '../../models/signin.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly basePath = 'http://localhost:8080/api/dev/auth';

  constructor(private http: HttpClient) {}

  signIn(signinRequest: SigninRequest): Observable<SigninResponse> {
    return this.http
      .post<SigninResponse>(`${this.basePath}/signin`, signinRequest)
      .pipe(
        tap(res => {
          localStorage.setItem('SESSION', res.access_token);
          window.location.href = '/s/home';
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('SESSION');
    window.location.href = '';
  }

  isSignedIn(): boolean {
    return !!localStorage.getItem('SESSION');
  }
}
