import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;

   messageSender: String;

  constructor(private contService: ContactService, private messService: MessagesService) { }

  ngOnInit() {
    let contact: Contact = this.contService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

  onSelected() {
    this.messService.messageSelected.emit(this.message);
  }

}
 