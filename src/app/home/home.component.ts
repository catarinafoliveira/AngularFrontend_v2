import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { Person } from '../thisModels/person';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username: string = "";

  constructor(
    private authenticatorService: AuthenticatorService
  ){}

  ngOnInit(): void {
    this.username = this.authenticatorService.getUserName();
    console.log(this.username);
  }
}