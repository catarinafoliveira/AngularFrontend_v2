import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../thisModels/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = "http://localhost:8080/api/cars" ;

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.apiUrl);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  updateCar(car: Car): Observable<Car> {
    const localURL = this.apiUrl+"/"+car._id;
    return this.http.put<Car>(localURL, car);
  }

  deleteCar(car: Car): Observable<Car> {
    const localURL = this.apiUrl+"/"+car._id;
    return this.http.delete<Car>(localURL);
  }
}
