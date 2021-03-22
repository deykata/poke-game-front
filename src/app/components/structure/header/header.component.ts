import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showSettings: boolean;

  constructor(
    private storage: StorageService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  signOut() {
    this.storage.clear().toPromise().then(() => {
      this.route.navigateByUrl('settings');
    })
  }

}
