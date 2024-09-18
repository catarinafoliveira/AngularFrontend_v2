import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MessageService } from './thisServices/message.service';

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
  
  constructor(private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.messageService.currentMessage$.subscribe((msg) => {
      this.message = msg;
      setTimeout(() => {this.message = null;}, 5000);
    });
  }
  
  // ===========================
  getUser(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user) : null;
  }
  
  getUserRole(): string | null {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).userRole : null;
  }  
  
  getUserId(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).id : null;
  }
  
  getUserName(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).username : null;
  }
  
  getUserIdCard(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).idCard : null;
  }
  
  getUserLicence(): string {
    const user = localStorage.getItem('decodedUser');
    return user ? JSON.parse(user).licence : null;
  }
}
