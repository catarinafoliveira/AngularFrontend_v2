import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../thisModels/user';
import { MessageService } from '../thisServices/message.service';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(
    private messageService: MessageService,
    private authenticationService: AuthenticatorService,
    private router: Router
  ){}

  login(): void {
    const user: User = {
      username: this.username,
      password: this.password,
      idCard: '',
      licence: '',
      role: ''
    };
  
    this.authenticationService.login(user).subscribe({
      next: (response: any) => {
        if (response.userToken) {
          localStorage.setItem('userToken', response.userToken);
          localStorage.setItem('decodedUser', JSON.stringify(jwtDecode(response.userToken)));
  
          this.username = '';
          this.password = '';
  
          this.messageService.sendMessage({
            text: 'Login successful.',
            type: 'alert alert-success'
          });
  
          this.router.navigate(['/']);
        } else {
          this.messageService.sendMessage({
            text: 'Failed to login.',
            type: 'alert alert-danger'
          });
        }
      },
      error: (err) => {
        this.messageService.sendMessage({
          text: 'Error logging in: ' + (err.error?.error || 'Unknown error'),
          type: 'alert alert-danger'
        });
      }
    });
  }  
}