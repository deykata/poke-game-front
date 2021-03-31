import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showModal: boolean;
  public showSettings: boolean;
  public showRankings: boolean;

  constructor(
    private storage: StorageService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  toggleModal(type) {
    this.showModal = !this.showModal;
    switch (type) {
      case 'settings':
        this.showSettings = !this.showSettings;
        break;
      case 'rankings':
        this.showRankings = !this.showRankings;
        break;
    
      default:
        this.showRankings = null;
        this.showSettings = null;
        this.showModal = false;
        break;
    }
  }

  signOut() {
    this.storage.clear().toPromise().then(() => {
      this.route.navigateByUrl('settings');
    })
  }

}
