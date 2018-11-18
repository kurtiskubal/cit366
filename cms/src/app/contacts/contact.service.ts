import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMax();
  }

  getContacts(): Contact[] {
    this.http.get('https://cmskurtiskubal.firebaseio.com/contacts.json')
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMax();
            this.contactListChangedEvent.next(this.contacts.slice())
          });
      (error: any) => {
        console.log(error);
      }
      return this.contacts.slice();
  }

  storeContacts(contacts: Contact[]) {
    let stringToServer = JSON.stringify(this.contacts);
    let header = new HttpHeaders({
      "Content-Type":"application/json"
    });
    this.http.put('https://cmskurtiskubal.firebaseio.com/contacts.json', stringToServer,{headers:header})
      .subscribe(result => {
        this.contactListChangedEvent.next(Object.assign(this.contacts));
      });
  }

  getContact(id: string): Contact {
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact
      }
    }
    return null;
  }

  getMax(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  deleteContact(contact: Contact){
    if(contact === null){
      return;
    }

    const pos = this.contacts.indexOf(contact);
      if(pos < 0){
        return;
      }
    this.contacts.splice(pos, 1);
    //this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts(this.contacts);
  }

  addContact(newContact: Contact) {
    if(!newContact){
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    //this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts(this.contacts);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact ){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);

    if(pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts(this.contacts);    
  }

}