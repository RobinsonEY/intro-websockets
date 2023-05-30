import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { interval, take } from 'rxjs';



const apiKey = 'ahkJc1xC3Xlps2CiBJjMrhiJcTZ9aCa8MtZA63SLomx' // Users API credentials are defined here
const apiSecret = 'KhzReGPZXvD7Rd1bMkcym9gVd1K7wxszpd0c2HqVA7B'

const authNonce = Date.now() * 1000 // Generate an ever increasing, single use value. (a timestamp satisfies this criteria)
const authPayload = 'AUTH' + authNonce // Compile the authentication payload, this is simply the string 'AUTH' prepended to the nonce value
const authSig = CryptoJS.HmacSHA384(authPayload, apiSecret).toString(CryptoJS.enc.Hex) // The authentication payload is hashed using the private key, the resulting hash is output as a hexadecimal string

const payload = {
  apiKey, //API key
  authSig, //Authentication Sig
  authNonce,
  authPayload,
  event: 'auth', // The connection event, will always equal 'auth'
}

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.css'],
})
export class Example3Component implements OnInit, AfterViewInit {

  public webSocket!: WebSocket;

  public objectToShow: { nameTable?: string, action?: string } = {}

  // Crear una cola de mensajes
  public messageQueue:any[] = [];

  constructor() { }


  public ngOnInit(): void {
    this.webSocket = new WebSocket('wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD')
  }


  ngAfterViewInit(): void {

    this.webSocket.addEventListener('open', (event) => {
      this.webSocket.send({ "op": "subscribe", "args": ['trade'] } as any);
    });


    this.webSocket.addEventListener('message', (event: any) => {
        const data = JSON.parse(event.data);
        this.objectToShow = {
          nameTable: data.table,
          action: data.action
        }
    });

    this.webSocket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });

    this.webSocket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

  }




}
