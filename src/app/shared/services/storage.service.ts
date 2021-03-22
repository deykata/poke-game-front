import { Injectable } from '@angular/core';
import { StoreConfig } from 'src/app/config/config';
import { LocalForageConfiguration, LocalForageService } from 'ngx-localforage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageConfig: LocalForageConfiguration = {} as LocalForageConfiguration;

  constructor(
    private storage: LocalForageService
  ) {}

  setConfig() {
    this.storageConfig.name = StoreConfig.DB_NAME;
    this.storageConfig.storeName = StoreConfig.DB_STORE;
    this.storage.config(this.storageConfig);
  }

  saveItem(key: string, val: any) {
    return this.storage.setItem(key, val);
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  getAll() {
    return this.storage.keys();
  }

  deleteItem(key: string) {
    return this.storage.removeItem(key);
  }

  clear() {
    return this.storage.clear();
  }
}
