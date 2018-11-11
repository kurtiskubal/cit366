import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { Form, NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params.id;
          if (id == undefined || id == null) {
            return;
          }
          this.originalDocument = this.documentService.getDocument(id);
          if (this.originalDocument == undefined || this.originalDocument == null) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      )
  }

  onSubmit(form: NgForm){
    let newId = this.documentService.getMaximum();
    newId = newId++;
    let values = form.value;
    let newDocument = new Document(newId.toString(), values['name'], values['description'], values['url'],[]);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
        this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
    console.log(form.value);
    
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
