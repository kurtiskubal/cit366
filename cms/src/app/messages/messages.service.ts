import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesChanged = new EventEmitter<Message[]>();
  messageSelected = new EventEmitter<Message>();
  maxMessage: number;
  messages: Message[] = [];

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
    this.maxMessage = this.getMaxId();
    this.getMessages();
   }

   storeMessages(messages: Message[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});

    this.http.put('https://cmskurtiskubal.firebaseio.com/messages.json', messages, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.messagesChanged.next(messages.slice())
      }
    )
  }

   getMessages() {
    this.http.get('https://cmskurtiskubal.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessage = this.getMaxId();
          this.messagesChanged.next(this.messages.slice())
        });
    (error: any) => {
      console.log(error);
    }
    return this.messages.slice();
  }

  getMessage(id: String): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        console.log(message.msgText);
        return message;
      }
    }
  }
  
  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages){
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addMessage(message: Message) {
    this.messages.push(message);
    //this.messagesChanged.emit(this.messages.slice());
    this.storeMessages(this.messages);    
  }

} 
