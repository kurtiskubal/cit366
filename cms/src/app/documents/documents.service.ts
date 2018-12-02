import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documentSelected = new EventEmitter<Document>();
  documents: Document[] = [];
  maxDocId: number;

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocId = this.getMaximum();
  }

  addDocument(document: Document) {
    if (document === null || document === undefined) {
      return
    } 
    this.maxDocId++ 
    document.id = String(this.maxDocId);
    this.documents.push(document);
    //this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments(this.documents);
}

  storeDocuments(documents: Document[]) {
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});

    this.http.put('https://cmskurtiskubal.firebaseio.com/documents.json', documents, {headers: headers})
    .subscribe(
      (response: Response) => {
        this.documentListChangedEvent.next(documents.slice())
      }
    )
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://cmskurtiskubal.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocId = this.getMaximum();
          this.documents.sort((a,b) => (a.name > b.name ) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.documentListChangedEvent.next(this.documents.slice())
        });
      (error: any) => {
        console.log(error);
      }
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
    //const documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(this.documents);
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
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(this.documents);
  }


}