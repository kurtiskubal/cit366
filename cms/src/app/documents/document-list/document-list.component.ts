import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  private subscription: Subscription;  
  documents: Document[] = [];
  
  constructor(private documentService: DocumentsService) {
    this.documents = documentService.getDocuments();
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
    console.log('Sub has start');

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log('Sub has stopped');
  }


}
 
