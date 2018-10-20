import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
  }

  onSelected() {
    this.documentService.documentSelected.emit(this.document);
  }
  
} 