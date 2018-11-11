import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact = null;
  contactsGroup: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }
      
      let contact = this.contactService.getContact(id);
      if (!contact) {
        return;
      }

      this.originalContact = contact;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(contact));

      if (contact.group) {
        this.contactsGroup = contact.group.slice();
      }
    });
  }

  onSubmit(form: NgForm) {
    let contact = new Contact('', form.value.name, form.value.email, form.value.phone, form.value.imageUrl, null);
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.contactsGroup.length; i++) {
      if (newContact.id === this.contactsGroup[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.contactsGroup.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx > this.contactsGroup.length) {
      return;
    }

    this.contactsGroup.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}