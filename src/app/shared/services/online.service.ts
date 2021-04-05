import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  rooms = this.socket.fromEvent<string[]>('rooms');
  receiveChallenge = this.socket.fromEvent('receiveChallenge');
  battleAlert = this.socket.fromEvent('startBattle');
  ongoingBattle = this.socket.fromEvent('ongoingBattle');

  constructor(
    private socket: Socket
  ) {}

  addRoom(player) {
    this.socket.emit('addRoom', { id: this.roomId(), roomPlayer: player, available: true });
  }

  sendChallenge(id, challenger) {
    this.socket.emit('newChallenge', { playerId: id, challenger });
  }

  respondToChallenge(result, challenger, player) {
    this.socket.emit('respondChallenge', { result, challenger, player });
  }

  updateBattle(data, room) {
    const payload = {data, room};
    this.socket.emit('updateBattle', payload);
  }

  endBattle(room) {
    this.socket.emit('endBattle', room);
  }

  private roomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
