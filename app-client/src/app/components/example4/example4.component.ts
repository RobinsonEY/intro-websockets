import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.css'],
})
export class Example4Component implements OnInit, AfterViewInit {

  private eventSource!: EventSource;


  constructor() { }

  public ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.eventSource = new EventSource("http://localhost:3000/events");
    this.eventSource.addEventListener('message', (event) => {
      console.log(event.data);
      // Aquí puedes procesar la respuesta
    });

  }




}
