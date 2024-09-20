import { Component } from '@angular/core';
import { AuthenticatorService } from '../thisServices/authenticator.service';
import { MessageService } from '../thisServices/message.service';

@Component({
  selector: 'app-my-person',
  standalone: true,
  imports: [],
  templateUrl: './my-person.component.html',
  styleUrl: './my-person.component.css'
})
export class MyPersonComponent {
  constructor(
    private messageService: MessageService,
    private authenticatorService: AuthenticatorService
  ) {}

  getUserRole(): string | null{
    return this.authenticatorService.getUserRole();
  }
}
