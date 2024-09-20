import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatorService } from './authenticator.service';
import { Observable } from 'rxjs';
import { Person } from '../thisModels/person';

@Injectable({
  providedIn: 'root'
})
export class MyPersonService {
  apiUrl: string = "http://localhost:8080/api/persons/";

  constructor(
    private http: HttpClient,
    private authenticatorService: AuthenticatorService
  ){}

  getOne(url: string): Observable<Person>{
    return this.http.get<Person>(this.apiUrl+url, { headers: this.authenticatorService.getHeaders() });
  }

  updatePerson(person: Person): Observable<Person> {
    const localURL = this.apiUrl+"/"+person._id;
    return this.http.put<Person>(localURL, person, { headers: this.authenticatorService.getHeaders() });
  }

  deletePerson(person: Person): Observable<Person> {
    const localURL = this.apiUrl+"/"+person._id;
    return this.http.delete<Person>(localURL, { headers: this.authenticatorService.getHeaders() });
  }
}
