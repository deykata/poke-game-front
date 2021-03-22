import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { StoreConfig } from 'src/app/config/config';
import { Settings, SettingsOptions } from 'src/app/shared/models/settings';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('settingsForm') settingsForm!: NgForm;
  @Input() mode: string;
  @Output() saved = new EventEmitter<boolean>();
  private storageKey = StoreConfig.DB_SETTINGS;
  public form: Settings = {} as Settings;
  public options: SettingsOptions = {} as SettingsOptions;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private route: Router,
    private storage: StorageService,
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.prepForm();
    this.autofillForm();
  }

  prepForm() {
    this.getTranslations();
    this.translate.onLangChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.getTranslations();
    })
  }

  getTranslations() {
    this.translate.get('SETTINGS').pipe(take(1)).subscribe(res => {
      this.options.langs = res.LANG_OPTIONS;
      this.options.themes = res.THEME_OPTIONS;
      this.options.renders = res.RENDER_OPTIONS;
      this.preselectOptions();
    })
  }

  preselectOptions() {
    this.form.lang = this.form.lang ? this.form.lang : this.options.langs ? Object.keys(this.options.langs)[0] : null;
    this.form.theme = this.form.theme ? this.form.theme : this.options.themes ? Object.keys(this.options.themes)[0] : null;
    this.form.render = this.form.render ? this.form.render : this.options.renders ? Object.keys(this.options.renders)[0] : null;
  }

  autofillForm() {
    this.storage.getItem(this.storageKey).toPromise().then(res => {
      if (res) {
        this.form.player = res.player;
        this.form.lang = res.lang;
        this.form.theme = res.theme;
        this.themeService.setActiveTheme(this.form.theme);
        this.form.render = res.render;
      }
    })
  }

  optionChange(data: string, type: any) {
    if (this.mode != 'page') return;
    switch (type) {
      case 'lang':
        this.translate.use(data);
        break;
      case 'theme':
        this.themeService.setActiveTheme(data);
        break;
    
      default:
        break;
    }
  }

  submit() {
    if (this.settingsForm.invalid) return;
    this.storage.saveItem(this.storageKey, this.form).subscribe(res => {
      if (this.mode == 'page') {
        this.route.navigateByUrl('arena');
      } else {
        this.translate.use(res.lang);
        this.themeService.setActiveTheme(res.theme);
        this.saved.emit(true);
      }
    }, err => {
      console.error(err);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }

}
