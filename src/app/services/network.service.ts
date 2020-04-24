import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable()
export class NetworkService {

  IsCordova: boolean;
  IsCordovaDevice: boolean;

  constructor(private platform: Platform, private network: Network) {
    platform.ready().then(() => {
      // Check that we are on a device
      if (platform.is('cordova')) {
        this.IsCordova = true;
      } else {
        this.IsCordova = false;
      }
      this.IsCordovaDevice = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;


    });
  }

  // Check the Internet connection
  isConnected(): boolean {

    if (this.IsCordova) {
      return this.network.type != "none";

    } else {
      return navigator.onLine;
    }
  }

  // Check if currently running on Ios.
  isIos(): boolean {
    return this.platform.is('ios');
  }

  // Check if currently running on Android.
  isAndroid(): boolean {
    return this.platform.is('android');
  }
}