export class Document {
    public id: string;
    public name: string;
    public description: string;
    public url: string;
    public children: Document[];
    

    constructor(docId: string, docName: string, docDescription: string, docUrl: string, docChildren: Document[] ) {
        this.id = docId;
        this.name = docName;
        this.description = docDescription;
        this.url = docUrl;
        this.children = docChildren;
        
    }

}