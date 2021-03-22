import { Injectable } from '@angular/core';
import { dark, light, Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor() {}

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  setActiveTheme(theme: string) {
    switch (theme) {
      case 'light':
        this.changeTheme(light);
        break;
      case 'dark':
        this.changeTheme(dark);
        break;
    
      default:
        break;
    }
  }

  changeTheme(theme: Theme) {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
