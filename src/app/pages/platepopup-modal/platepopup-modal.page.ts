import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OpenALPRResult } from "@ionic-native/openalpr/ngx";

@Component({
  selector: 'app-platepopup-modal',
  templateUrl: './platepopup-modal.page.html',
  styleUrls: ['./platepopup-modal.page.scss'],
})
export class PlatepopupModalPage implements OnInit {
  plateImage: any;
  numberList: OpenALPRResult[];
  constructor( private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.plateImage = this.navParams.data.image;
    this.numberList = this.navParams.get("numberList");
  }
  roundConfidence(confidence: number) {
    return Math.round(confidence);
  }
  selectNumber(selectedNumber){
    const onClosedData: string = selectedNumber;
   this.modalController.dismiss(onClosedData);
  }

}
