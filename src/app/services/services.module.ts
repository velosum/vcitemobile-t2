import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SettingsService } from './settings.service';
import { DbService } from './db.service';
import { NetworkService } from './network.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    AuthService,
    SettingsService,
    NetworkService,
    DbService
  ]
})
export class ServicesModule { }
