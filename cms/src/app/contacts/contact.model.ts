import { Injectable } from '@angular/core';

@Injectable()

export class Contact {
    public id: string;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group: Contact[];

    constructor(contactId: string, name: string, email: string, phone: string, imageUrl: string, group: Contact[]) {
        this.id = contactId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }

}