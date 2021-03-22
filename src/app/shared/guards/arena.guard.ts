import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { StoreConfig } from 'src/app/config/config';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArenaGuard implements CanLoad {

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canLoad(): Promise<boolean> {
      return this.storage.getItem(StoreConfig.DB_SETTINGS).toPromise().then(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['settings']);
          return false;
        }
      })
  }
}
