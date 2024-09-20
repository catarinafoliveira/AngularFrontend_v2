import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MessageService } from './thisServices/message.service';
import { AuthenticatorService } from './thisServices/authenticator.service';
import { Person } from './thisModels/person';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myFrontend_v2';
  message: { text: string; type: string } | null = null;
  
  constructor(
    private messageService: MessageService,
    private authenticatorService: AuthenticatorService
  ) {}
  
  ngOnInit(): void {
    this.messageService.currentMessage$.subscribe((msg) => {
      this.message = msg;
      setTimeout(() => {this.message = null;}, 5000);
    });
  }

  getUserRole(): string | null{
    return this.authenticatorService.getUserRole();
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
  }
  
}
