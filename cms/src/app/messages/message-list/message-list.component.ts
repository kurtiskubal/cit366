import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message (21, "Urgent", "Please respond back", "Bill"),
    new Message (21, "Urgent", "Please respond back", "Bill"),
    new Message (21, "Urgent", "Please respond back", "Bill"),
  ];

  constructor() { }

  ngOnInit() {
  }

  onMessageAdded(message: Message) {
    this.messages.push(message);
  }

}
  