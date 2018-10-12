import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @Output() messageAdded = new EventEmitter<Message>();
  
  currentSender: string = "Kurtis Kubal";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const mesSubject = this.subjectInputRef.nativeElement.value;
    const mesMessage = this.messageInputRef.nativeElement.value;
    const newMessage = new Message(12, mesSubject, mesMessage, this.currentSender);
    this.messageAdded.emit(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = " ";
    this.messageInputRef.nativeElement.value = " ";
  }
  
}
 