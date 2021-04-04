import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OnlineBattle } from '../models/online-battle';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  currentBattle = this.socket.fromEvent<OnlineBattle>('battle');
  battles = this.socket.fromEvent<string[]>('battles');

  constructor(
    private socket: Socket
  ) { }

  getBattle(id: string) {
    this.socket.emit('getBattle', id);
  }

  addBattle() {
    this.socket.emit('addBattle', { id: this.battleId(), battle: '' });
  }

  updateBattle(battle: OnlineBattle) {
    this.socket.emit('updateBattle', battle);
  }

  private battleId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
