import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  private buildUrl(endpoint) {
    return environment.API_URL_WRAPPER + AppConfig.W_USERS_BASE + endpoint;
  }

  doCheckUser(user) {
    return this.http.post(this.buildUrl(AppConfig.W_USERS_CHECK), user);
  }
}
