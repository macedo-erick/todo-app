import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SigninRequest, SigninResponse } from '../../models/signin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly basePath = 'http://localhost:8080/api/dev/auth';
  isAuthenticated = signal(!!localStorage.getItem('SESSION'));

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(signinRequest: SigninRequest): Observable<SigninResponse> {
    return this.http
      .post<SigninResponse>(`${this.basePath}/signin`, signinRequest)
      .pipe(
        tap((res) => {
          localStorage.setItem('SESSION', res.access_token);
          this.isAuthenticated.set(true);
          void this.router.navigate(['/s/home']);
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('SESSION');
    this.isAuthenticated.set(false);
    void this.router.navigate(['/p/signin']);
  }
}
