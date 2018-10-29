import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelected = new EventEmitter<Contact>();
  contactsChanged = new EventEmitter<Contact[]>();


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
    
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactsChanged.emit(this.contacts.slice());
  }
}