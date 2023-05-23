import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface Message {
  id?:string,
  message?:string,
  class?:string
}

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css'],
})
export class Example2Component implements OnInit, AfterViewInit, AfterViewChecked {

  public socket: any;

  public messages:Array<Message> = new Array();

  public inputValue:string='';

  public isTyping:boolean=false;

  constructor(private changeDetector : ChangeDetectorRef ) { }

  public ngOnInit(): void {
    this.socket = io("http://localhost:3000", { transports: ['websocket'] });
  }

  public createMessage(text:any, ownMessage = false) {
    let message:Message ={};
    message.class = "px-4 py-4 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600";
    if (ownMessage) {
      message.class += " float-right bg-blue-800 text-white";
    }
    message.message = text;
    this.messages.push(message);
  }

  
  public sendMessage(message:any):void{
      if (message != "") {
        this.socket.emit("send-message", message);
        this.createMessage(message, true);
        this.inputValue = "";
        this.socket.emit("typing", false);
      }
  }

  public isTypingAction(inputValue:string):void{
    if(inputValue){
      this.socket.emit("typing", true);
    }else{
      this.socket.emit("typing", false);
    }
  }

  ngAfterViewInit(): void {
    this.socket.on("receive-message", (message:any) => {
      this.createMessage(message);
    });
    this.socket.on("typing", (isTyping:any) => {
      if(!this.inputValue&&isTyping){
        this.isTyping=true;
      }else{
        this.isTyping=false;
      }
    });
  }

  ngAfterViewChecked(){ this.changeDetector.detectChanges(); }
  
  

}
