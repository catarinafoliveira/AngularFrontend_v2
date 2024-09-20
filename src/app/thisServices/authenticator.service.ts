import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  logout(): void {
    localStorage.clear();
  }
  
  getUser(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user) : null;
  }
  
  getUserRole(): string | null {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).userRole : null;
  }  
  
  getUserId(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).id : null;
  }
  
  getUserName(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).username : null;
  }
  
  getUserIdCard(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).idCard : null;
  }
  
  getUserLicence(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).licence : null;
  }
  
  getToken(): string | null{
    return localStorage.getItem('userToken');
  }
  
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
}
