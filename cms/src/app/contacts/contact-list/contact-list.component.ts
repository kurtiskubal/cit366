import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  private subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = contactService.getContacts();
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}