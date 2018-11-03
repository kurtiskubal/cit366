import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelected = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContact: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  addContact(contact: Contact){
    if(contact == null || contact == undefined){
      return;
    }

    this.maxContact++;
    contact.id = String(this.maxContact);
    this.contacts.push(contact);
    this.contactListChangedEvent.next(this.contacts.slice());
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
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, updateContact: Contact) {
    if(originalContact == null || originalContact == undefined ||
      updateContact == null || updateContact == undefined){
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0) {
      return;
    }
    updateContact.id = originalContact.id;
    this.contacts[pos] = updateContact;

    this.contactListChangedEvent.next(this.contacts.slice());
  }

}