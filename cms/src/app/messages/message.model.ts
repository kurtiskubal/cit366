export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;

    constructor(msgId: string, msgSubject: string, mesText: string, senderUrl: string) {
        this.id = msgId;
        this.subject = msgSubject;
        this.msgText = mesText;
        this.sender = senderUrl;
        
    }

}