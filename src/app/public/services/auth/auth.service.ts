import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SigninRequest, SigninResponse} from '../../models/signin.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  readonly basepath = "http://localhost:8080/api/dev/auth"

  constructor(private http: HttpClient, private router: Router) {
  }

  signIn(signinRequest: SigninRequest): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${this.basepath}/signin`, signinRequest).pipe(
      tap((res => {
          localStorage.setItem("SESSION", res.access_token)
          void this.router.navigate(['/p/home'])
        })
      ));
  }
}
