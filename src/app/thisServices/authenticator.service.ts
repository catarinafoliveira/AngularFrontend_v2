import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../thisModels/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private apiUrlRegister = "http://localhost:8080/api/auth/register" ;
  private apiUrlLogin = "http://localhost:8080/api/auth/login" ;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlRegister, user);
  }
}
