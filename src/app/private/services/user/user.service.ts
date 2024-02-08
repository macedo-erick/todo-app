import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly basepath = "http://localhost:8080/api/dev/users"

  constructor(private http: HttpClient) {
  }

  find() {
    return this.http.get(this.basepath)
  }
}
