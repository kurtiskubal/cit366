import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  
  constructor(private documentService: DocumentsService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChanged.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }
}
 
