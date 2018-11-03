import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from "rxjs/Subject";


export class DocumentsService {

  documentListChangedEvent = new Subject<Document[]>();
  documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];
  maxDocId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaximum();
  }

  addDocument(document: Document) {
    if (document === null || document === undefined) {
      return
    } 
    this.maxDocId++ 
    document.id = String(this.maxDocId);
    this.documents.push(document);
    this.documentListChangedEvent.next(this.documents.slice());
}

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find( (document: Document) => document.id === id);
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  getMaximum() {
    let max = 0;
    for (let document of this.documents) {
      const currentId = +document.id;
      if (currentId > max) {
        max = currentId;
      }
    }
    return max;
  }

  updateDocument(originalDocument: Document, updateDocument: Document){
    if(originalDocument === null || updateDocument === undefined || updateDocument === null || originalDocument === undefined){
      return
    }
    updateDocument.id = originalDocument.id;
    const pos = this.documents.indexOf(originalDocument)
    if(pos < 0){
      return
    }
    this.documents[pos] = updateDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


}