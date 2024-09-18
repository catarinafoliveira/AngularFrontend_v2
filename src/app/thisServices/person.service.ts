import { Injectable } from '@angular/core';
import { Person } from '../thisModels/person';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = "http://localhost:8080/api/persons" ;

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(this.apiUrl);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(person: Person): Observable<Person> {
    const localURL = this.apiUrl+"/"+person._id;
    return this.http.put<Person>(localURL, person);
  }

  deletePerson(person: Person): Observable<Person> {
    const localURL = this.apiUrl+"/"+person._id;
    return this.http.delete<Person>(localURL);
  }
}