import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private http: HttpClient
  ) {}

  private buildUrl(type) {
    let endpoint;
    switch (type) {
      case 'battle':
        endpoint = AppConfig.W_RANKINGS_BATTLE;
        break;
      case 'player':
        endpoint = AppConfig.W_RANKINGS_PLAYER;
        break;
        
      default:
        endpoint = AppConfig.W_RANKINGS_COMBINED;
        break;
    }
    return AppConfig.API_URL_WRAPPER + AppConfig.W_RANKINGS_BASE + endpoint;
  }

  getRanking(type, limit, userId) {
    return this.http.get(this.buildUrl(type) + '?limit=' + limit + '&userId=' + userId);
  }
}
