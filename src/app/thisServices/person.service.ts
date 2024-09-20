import { Injectable } from '@angular/core';
import { Person } from '../thisModels/person';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = "http://localhost:8080/api/persons" ;

  constructor(
    private http: HttpClient,
    private authenticatorService: AuthenticatorService
  ){}

  getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(this.apiUrl, { headers: this.authenticatorService.getHeaders() });
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person, { headers: this.authenticatorService.getHeaders() });
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