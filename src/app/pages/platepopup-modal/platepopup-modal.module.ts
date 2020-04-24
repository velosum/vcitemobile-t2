import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlatepopupModalPage } from './platepopup-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PlatepopupModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlatepopupModalPage]
})
export class PlatepopupModalPageModule {}
