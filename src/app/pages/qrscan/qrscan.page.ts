import { CitationstorageService } from './../../services/citationstorage.service';
import { CitationViewMidel } from './../../model/citationViewModel';
import { DefaultvaluesService } from './../../services/defaultvalues.service';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, NavController, AlertController } from '@ionic/angular';

import { Citation } from 'src/app/entities/Citation';
import { CitationService } from 'src/app/services/citation.service';
import { DefaultValues } from 'src/app/utility/constant';
import { throwAppError } from 'src/app/shared/error-handler';
import { Platform, LoadingController } from '@ionic/angular';


export interface ScanResult {
  message?: string;
  status?: 'not_found' | 'invalid' | 'success';
  data?: string;
}


@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  scanResult: ScanResult;

  citation: CitationViewMidel;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private defaultvaluesService: DefaultvaluesService,
    private citationService: CitationService,
    private platform: Platform,
    private citationstorageService: CitationstorageService,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    // this.citation = await ;
   this.citationService.getDefaultCitation().then(data => {
    console.log(' this.citation data => => ',  data);
   })
    this.defaultvaluesService.getDefaultValues().then(data => {
      this.citation = data;
    console.log(' this.citation => => ',  this.citation);

    });
  }

  async onScan() {

    if (this.platform.is('cordova') || this.platform.is('ios')) {
    // if (!this.platform.is('ios')) {
    try {
      this.scanResult = {};

      const barcode = await this.barcodeScanner.scan();
      this.scanResult.data = barcode.text;

      // stop now if scan was no good, or format wasn't QR_CODE
      if (!barcode.format || barcode.format !== 'QR_CODE') {
        this.scanResult.message = 'Bad scan, or not a valid QR Code.';
        this.scanResult.status = 'invalid';

        return;
      }

      // check if scanned text contains the vciteplus.com domain, and has a query string
      if (this.scanResult.data.length < 50 || !this.scanResult.data.includes('vciteplus.com') || !this.scanResult.data.includes('?cid')) {
        this.scanResult.message = 'Not a Velosum ticket.';
        this.scanResult.status = 'invalid';

        return;
      }


      if (!this.citation) {
        this.citation = new CitationViewMidel();
      }

      const {cid, sn} = this.parseParams(this.scanResult.data);
      this.citation.id = Date.now();
      this.citation.custKey = cid;
      this.citation.serial_number = sn;

      this.scanResult.message = 'New Citation scanned!';
      this.scanResult.status = 'success';

    } catch (e) {
      console.log(e);
      this.showMessage(e, 'danger');
    }
    } else {
      this.scanResult = {};

      this.scanResult.data =  "https://www.vciteplus.com/portal.aspx?cid=39&sn=TEST106";

      // check if scanned text contains the vciteplus.com domain, and has a query string
      if (this.scanResult.data.length < 50 || !this.scanResult.data.includes('vciteplus.com') || !this.scanResult.data.includes('?cid')) {
        this.scanResult.message = 'Not a Velosum ticket.';
        this.scanResult.status = 'invalid';

        return;
      }

      if (!this.citation) {
        this.citation = new CitationViewMidel();
      }
      const {cid, sn} = this.parseParams(this.scanResult.data);
      this.citation.id = Date.now();
      this.citation.custKey = cid;
      this.citation.serial_number = sn;

      this.scanResult.message = 'New Citation scanned!';
      this.scanResult.status = 'success';
      console.log(' this.citation =>  ',  this.citation );
    }
  }

  /**
   * create a new Citation and navigate to detail page.
   */
  async onContinue() {
    try {

      const test = true;
      const loading = await this.loadingCtrl.create();
      loading.present();
      // const citation = await this.citationService.getCitation(this.citation.id);
      // if (!citation || citation.id === DefaultValues.CITATION_DEFAULT_ID) {
        this.citationstorageService.getCitationsById(this.citation.id).then(data => {
          console.log(" data =>  ", data);
        });
      if (test) {
        this.citation.timestamp = String(Date.now());
        this.citation.is_visible = true;

        // console.log(this.citation);
        // alert( JSON.stringify(this.citation));
        try {
          // await this.citation.save();
          this.citationstorageService.saveCitations(this.citation);
            setTimeout(async () => {
            loading.dismiss();
              await this.navCtrl.navigateForward(`/citation/${this.citation.id}`);
            }, 1200);
        } catch (e) {
          console.log(e);
          loading.dismiss();
          throwAppError('DB_ENTITY_INSERT_FAILED');
        }
      } else {

        const alert = await this.alertCtrl.create({
          subHeader: 'Citation exists!',
          message: `A citation with <string>#${this.citation.id}</string> already exists, \
                    but you can continue to Citation page as edit mode.`,
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'danger'
          }, {
            text: 'Ok',
            handler: () => {
              this.navCtrl.navigateForward(`/citation/${this.citation.id}`);
            }
          }]
        });
        alert.present();

      }
    } catch (e) {
      console.log(e);

      throwAppError('DB_ENTITY_READ_FAILED');
    }
  }
  
  /**
   * parse query params from a url
   *
   * @param url string
   */
  private parseParams(url: string) {
    const pl     = /\+/g;  // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = (s) => decodeURIComponent(s.replace(pl, ' '));
    const query  = url.split('?').pop();

    let match;
    const urlParams: any = {};
    while (match = search.exec(query)) {
       urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams;
  }

  private async showMessage(message: string | any, type?: 'primary' | 'danger') {
    if (typeof message !== 'string' ) {
      message = message.message || JSON.stringify(message);
    }

    const toast = await this.toastCtrl.create({
      message: message,
      color: type,
      showCloseButton: true
    });

    toast.present();
  }

}
