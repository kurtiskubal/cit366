import { Component, OnInit,} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from '../window-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  
  document: Document;
  nativeWindow: any;

  constructor(
      private documentService: DocumentsService,
      private route: ActivatedRoute,
      private router: Router,
      private windowRefer: WindRefService,
      ) { 
        this.nativeWindow = windowRefer.getNativeWindow();
      }

      ngOnInit() {
        this.route.params.subscribe(
          (params: Params) => {
            this.document = this.documentService.getDocument(params.id);
          }
        );
      }

      onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }


}
