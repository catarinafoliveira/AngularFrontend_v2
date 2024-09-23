import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../thisModels/car';
import { AuthenticatorService } from './authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class MyCarService {
  private apiUrl = "http://localhost:8080/api/cars" ;
  
  constructor(
    private http: HttpClient,
    private authenticatorService: AuthenticatorService
  ){}
  
  getCars(licence: string): Observable<Car[]>{
    return this.http.get<Car[]>(this.apiUrl+"/owner/"+licence, { headers: this.authenticatorService.getHeaders() });
  }
  
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, { headers: this.authenticatorService.getHeaders() });
  }
}
