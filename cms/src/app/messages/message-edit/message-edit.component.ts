import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  
  currentSender: string = "Kurtis Kubal";

  constructor(private messService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const mesSub = this.subjectInputRef.nativeElement.value;
    const mesBody = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('30', mesSub, mesBody, '30' );
    this.messService.addMessage(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = " ";
    this.messageInputRef.nativeElement.value = " ";
  }
  
}
 