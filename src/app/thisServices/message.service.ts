import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Message {
  text: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<Message>();
  currentMessage$ = this.messageSource.asObservable();

  sendMessage(message: Message) {
    this.messageSource.next(message);
  }
}
