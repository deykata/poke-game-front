import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { AppConfig } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;

  constructor() {
    this.socket = io(AppConfig.WS_URL);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
