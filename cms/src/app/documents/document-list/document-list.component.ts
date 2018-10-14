import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() documentWasSelected = new EventEmitter<Document>();

  documents: Document[] = [
    new Document (12, 'Bob', 'This is Bobs document', 'bob.com', null),
    new Document (12, 'Bob', 'This is Bobs document', 'bob.com', null),
    new Document (12, 'Bob', 'This is Bobs document', 'bob.com', null),
  ];
  
  constructor() { }

  ngOnInit() {
  }


  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }
}
 
