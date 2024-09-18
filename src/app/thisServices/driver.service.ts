import { Injectable } from '@angular/core';
import { Driver } from '../thisModels/driver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = "http://localhost:8080/api/drivers" ;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]>{
    return this.http.get<Driver[]>(this.apiUrl);
  }

  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  updateDriver(driver: Driver): Observable<Driver> {
    const localURL = this.apiUrl+"/"+driver._id;
    return this.http.put<Driver>(localURL, driver);
  }

  deleteDriver(driver: Driver): Observable<Driver> {
    const localURL = this.apiUrl+"/"+driver._id;
    return this.http.delete<Driver>(localURL);
  }
}