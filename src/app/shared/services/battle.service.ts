import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(
    private http: HttpClient
  ) {}

  private buildUrl(endpoint) {
    return environment.API_URL_WRAPPER + AppConfig.W_BATTLES_BASE + endpoint;
  }

  getBattleTypes() {
    return this.http.get(this.buildUrl(AppConfig.W_BATTLES_TYPES));
  }

  saveBattleResult(payload) {
    return this.http.post(this.buildUrl(AppConfig.W_BATTLES_NEW), payload);
  }
}
