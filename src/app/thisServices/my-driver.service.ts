import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticatorService } from './authenticator.service';
import { Observable } from 'rxjs';
import { Driver } from '../thisModels/driver';

@Injectable({
  providedIn: 'root'
})
export class MyDriverService {
  apiUrl: string = "http://localhost:8080/api/drivers/";

  constructor(
    private http: HttpClient,
    private authenticatorService: AuthenticatorService
  ){}

  getOne(url: string): Observable<Driver>{
    return this.http.get<Driver>(this.apiUrl+url, { headers: this.authenticatorService.getHeaders() });
  }

  updateDriver(driver: Driver): Observable<Driver> {
    const localURL = this.apiUrl+"/"+driver._id;
    return this.http.put<Driver>(localURL, driver, { headers: this.authenticatorService.getHeaders() });
  }

  deleteDriver(driver: Driver): Observable<Driver> {
    const localURL = this.apiUrl+"/"+driver._id;
    return this.http.delete<Driver>(localURL, { headers: this.authenticatorService.getHeaders() });
  }
}
