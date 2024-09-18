import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../thisModels/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    const apiUrlRegister = "http://localhost:8080/api/auth/register" ;
    return this.http.post<User>(apiUrlRegister, user);
  }

  login(user: User): Observable<User> {
    const apiUrlLogin = "http://localhost:8080/api/auth/login" ;
    return this.http.post<User>(apiUrlLogin, user);
  }
}
