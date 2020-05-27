import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly storageKey: string = 'config';

  constructor() { }

  getSettings(): VSettings {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  setSettings(config: VSettings) {
    return window.localStorage.setItem(this.storageKey, JSON.stringify(config));
  }

}

export interface VSettings {
  timestamp?: number;
  custKey?: number;
  userID ?: string;
  hostURL?: string;
}
