import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SigninRequest, SigninResponse } from '../../models/sign-in.model';
import { SignUpRequest } from '../../models/sign-up.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);
  #jwtService = inject(JwtHelperService);

  isAuthenticated = signal(!this.#jwtService.isTokenExpired());

  #BASE_PATH = `${environment.apiBasePath}/auth`;

  signIn(signinRequest: SigninRequest): Observable<SigninResponse> {
    return this.#http
      .post<SigninResponse>(`${this.#BASE_PATH}/sign-in`, signinRequest)
      .pipe(
        tap((res) => {
          localStorage.setItem('SESSION', res.accessToken);
          this.isAuthenticated.set(true);
          void this.#router.navigate(['/s/home']);
        })
      );
  }

  signUp(signUpRequest: SignUpRequest): Observable<unknown> {
    return this.#http.post(`${this.#BASE_PATH}/sign-up`, signUpRequest).pipe(
      tap(() => {
        void this.#router.navigate(['/p/sign-in']);
      })
    );
  }

  signOut(): void {
    window.location.href = '/p/sign-in';
    localStorage.removeItem('SESSION');
  }
}
