import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelected = new EventEmitter<Contact>();

  contacts: Contact[];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: String): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        console.log(contact.name);
        return contact;
      }
    }
  }
    



  

}
