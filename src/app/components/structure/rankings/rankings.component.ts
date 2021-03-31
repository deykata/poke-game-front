import { Component, OnInit } from '@angular/core';
import { StoreConfig } from 'src/app/config/config';
import { Settings } from 'src/app/shared/models/settings';
import { TableData } from 'src/app/shared/models/table-data';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  public rankingData: TableData = {} as TableData;
  public rankingLimit: number = 10;
  public selectedType: string;
  public playerId: number;
  public rankingTypes = [
    {
      type: 'combined',
      name: 'Combined'
    },
    {
      type: 'player',
      name: 'Player'
    },
    {
      type: 'battle',
      name: 'Battle'
    },
  ]

  constructor(
    private rankingService: RankingService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.selectedType = this.rankingTypes[0].type;
    this.getUserData();
  }

  getUserData() {
    this.storage.getItem(StoreConfig.DB_SETTINGS).toPromise().then((res: Settings) => {
      this.playerId = res.playerId;
      this.getRanking();
    })
  }

  getRanking() {
    this.rankingService.getRanking(this.selectedType, this.rankingLimit, this.playerId).toPromise().then(res => {
      this.rankingData.headers = ['Position','Player','Points'];
      this.rankingData.body = (res as any).rankings;
      this.rankingData.order = ['position','player','points'];
    })
  }

}
