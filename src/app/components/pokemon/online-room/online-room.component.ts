import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StoreConfig } from 'src/app/config/config';
import { Settings } from 'src/app/shared/models/settings';
import { OnlineService } from 'src/app/shared/services/online.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-online-room',
  templateUrl: './online-room.component.html',
  styleUrls: ['./online-room.component.scss']
})
export class OnlineRoomComponent implements OnInit {
  @Output() acceptedBattle = new EventEmitter<string>();
  rooms: any = [];
  player: Settings;
  showModal: boolean;
  challenger: any;
  subscriptions: any = [];

  constructor(
    private onlineService: OnlineService,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    
    this.storage.getItem(StoreConfig.DB_SETTINGS).pipe(take(1)).subscribe(res => {
      this.player = res.player;
      this.onlineService.addRoom(this.player);
      const sub1 = this.onlineService.rooms.subscribe(res => {
        this.rooms = res;
      });
      const sub2 = this.onlineService.receiveChallenge.subscribe(res => {
        this.challenger = res;
        this.showModal = true;
      })
      const sub3 = this.onlineService.battleAlert.subscribe((res: string) => {
        this.acceptedBattle.emit(res);
      })
      this.subscriptions = [sub1, sub2, sub3];
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  challangePlayer(room) {
    if (!room.available) return;
    this.onlineService.sendChallenge(room.id, this.player);
  }

  respondToChallenge(result) {
    this.onlineService.respondToChallenge(result, this.challenger, this.player);
    this.showModal = false;
  }
}
