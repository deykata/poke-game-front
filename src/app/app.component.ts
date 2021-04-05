import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { StoreConfig } from './config/config';
import { StorageService } from './shared/services/storage.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private storage: StorageService,
    private translate: TranslateService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    this.storageInit();  
  }

  storageInit() {
    this.storage.setConfig();
    this.storage.getItem(StoreConfig.DB_SETTINGS).pipe(take(1)).subscribe(res => {
      const lang = res && res.lang ? res.lang : this.translate.getBrowserLang().includes('en') ? 'en' : 'es';
      this.translate.use(lang);
      this.translate.setDefaultLang(lang);
      this.themeService.setActiveTheme(res?.theme);
    })
  }
}
