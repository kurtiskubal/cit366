import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentSelected = new EventEmitter<Document>();

  idInput: number;
  documents: Document[];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(documentId: number): Document {
    this.documents.forEach(document => {
      if (documentId === this.idInput) {
        return document;
      }
    });
    return null;
  }

}
