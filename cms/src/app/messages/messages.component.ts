import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {

  selectedMessage: Message;

  constructor(private messService: MessagesService) { }

  ngOnInit() {
    this.messService.messageSelected
    .subscribe(
      (message: Message) => {
        this.selectedMessage = message;
      }
    )
  }

}
