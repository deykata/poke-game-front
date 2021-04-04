import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { OnlineService } from 'src/app/shared/services/online.service';
import { WebSocketService } from 'src/app/shared/services/web-socket.service';

@Component({
  selector: 'app-online-room',
  templateUrl: './online-room.component.html',
  styleUrls: ['./online-room.component.scss']
})
export class OnlineRoomComponent implements OnInit {
  battles: Observable<string[]>;
  currentBattle: string;
  private _battleSub: Subscription;

  constructor(
    // private onlineService: OnlineService,
    private wsService: WebSocketService
  ) { }

  ngOnInit(): void {
    // this.onlineService.battles.subscribe(msg => {
    //   console.log(msg);
    // });
    // this._battleSub = this.onlineService.currentBattle.subscribe(battle => this.currentBattle = battle.id);

    // this.newBattle();

    this.wsService.listen('battles').subscribe(data => {
      console.log(data);
    })
  }

  ngOnDestroy() {
    this._battleSub.unsubscribe();
  }

  loadBattle(id: string) {
    // this.onlineService.getBattle(id);
  }

  newBattle() {
    // this.onlineService.addBattle();
  }

}
