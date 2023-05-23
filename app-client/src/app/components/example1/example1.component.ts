import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css']
})
export class Example1Component implements OnInit {


  @ViewChild("game")
  private gameCanvas!: ElementRef;

  private context: any;
  private socket: any;

  public ngOnInit() {
    this.socket = io("http://localhost:3000", { transports: ['websocket'] });
  }

  public move(direction: string) {
    this.socket.emit("move", direction);
  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext("2d");
    this.socket.on("position", (data: any) => {
      this.context.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
      this.context.fillRect(data.x, data.y, 20, 20);
    });
  }
  
}
