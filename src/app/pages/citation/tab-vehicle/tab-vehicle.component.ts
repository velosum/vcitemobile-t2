import { Component } from '@angular/core';
import { AbstractComponent } from '../abstract.component';
import { DefaultValues } from 'src/app/utility/constant';
import { NotifyService } from 'ionic4-kits';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, Platform, ModalController } from '@ionic/angular';
import { OpenALPR, OpenALPROptions, OpenALPRResult } from "@ionic-native/openalpr/ngx";
import { PlatepopupModalPage } from '../../platepopup-modal/platepopup-modal.page';

declare let cordova: any;
@Component({
  selector: 'tab-vehicle',
  templateUrl: './tab-vehicle.component.html',
  styleUrls: ['./tab-vehicle.component.scss']
})
export class TabVehicleComponent extends AbstractComponent {
  VIN_MAX_LENGTH = DefaultValues.CITATION_MAX_VIN;

  private scanOptions: OpenALPROptions;

  licenseKey: "eyAiYW5kcm9pZElkZW50aWZpZXIiOiBbICJpby5hbnlsaW5lLmV4YW1wbGVzLmNvcmRvdmEiIF0sICJkZWJ1Z1JlcG9ydGluZyI6ICJvcHQtb3V0IiwgImltYWdlUmVwb3J0Q2FjaGluZyI6IGZhbHNlLCAiaW9zSWRlbnRpZmllciI6IFsgImlvLmFueWxpbmUuZXhhbXBsZXMuY29yZG92YS5iZXRhIiwgImlvLmFueWxpbmUuZXhhbXBsZXMuY29yZG92YSIgXSwgImxpY2Vuc2VLZXlWZXJzaW9uIjogMiwgIm1ham9yVmVyc2lvbiI6ICI0IiwgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiaU9TIiwgIkFuZHJvaWQiLCAiV2luZG93cyIgXSwgInNjb3BlIjogWyAiQUxMIiBdLCAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiB0cnVlLCAic2hvd1dhdGVybWFyayI6IHRydWUsICJ0b2xlcmFuY2VEYXlzIjogOTAsICJ2YWxpZCI6ICIyMDIwLTEwLTIwIiwgIndpbmRvd3NJZGVudGlmaWVyIjogWyAiaW8uYW55bGluZS5leGFtcGxlcy5jb3Jkb3ZhIiBdIH0KRnoxUmNxbUJ0YVRBRVl6NlNFQlhPRWxlLzlXNFVOVlJjdEJjTVhDTGVQMlRGV0dUTDdzWlB1WnJnTWkwOHlFVwpTUlp6emVNNTN2UnRoLzFVMGd5TGxzVmF0clZTd0lCMkRQbmxldnpUK3VHcGdRUUorS2w5N1dRRmljUlJ0di9VCnFjMU5md3RRMWVQREtMR05XaVZwbU94a2xIUzJ3OWV5c0ZHRHo4M20xRDZ5V2s0SkJ2MG9zOWhvak02bUtsU0MKVDZQYnJZcTkycFZRenFNUFdhZ3FoTXpvdGRDNE1YcktJY3FQbTBhc3FxRXM2VzkrM1d6aWI4NjRaSDVrM1ZqRgp3UGIzaVZqWW9aTVZFYVFGK1pQUmFoU3ZhNEhhMnhKakt0NXpkWTVtbkFKb1ZyaGVmNGYzNlFDME5ncnlkT0w3CkNFYzZxMk5acUNKSjhPLzBUT2trNmc9PQo=";

  anylineLicensePlateViewConfig: {
    "camera": {
      "captureResolution": "1080p",
      "zoomGesture": true
    },
    "flash": {
      "mode": "manual",
      "alignment": "top_left"
    },
    "viewPlugin": {
      "plugin": {
        "id": "LicensePlate_ID",
        "licensePlatePlugin": {
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "top_half",
        "width": 720,
        "ratioFromSize": {
          "width": 2,
          "height": 1
        },
        "strokeWidth": 2,
        "cornerRadius": 10,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "feedbackStrokeColor": "0099FF"
      },
      "scanFeedback": {
        "animationDuration": 0,
        "style": "RECT",
        "strokeWidth": 2,
        "strokeColor": "0099FF",
        "blinkOnResult": true,
        "beepOnResult": true,
        "vibrateOnResult": true
      },
      "cancelOnResult": true,
      "delayStartScanTime": 2000
    }
  };

  anyLineMrzScannerConfig:
    {
      camera: {
        captureResolution: '1080'
      },
      flash: {
        mode: 'manual',
        alignment: 'bottom_right'
      },
      viewPlugin: {
        plugin: {
          id: 'IDPlugin_ID',
          idPlugin: {
            mrzConfig: {
              strictMode: false,
              cropAndTransformID: true,
              mrzFieldScanOptions: {
                vizDateOfIssue: 'optional',
                vizAddress: 'optional'
              }
            }
          }
        },
        cutoutConfig: {
          style: 'rect',
          maxWidthPercent: '90%',
          maxHeightPercent: '90%',
          alignment: 'center',
          ratioFromSize: {
            width: 5,
            height: 1
          },
          strokeWidth: 3,
          cornerRadius: 10,
          strokeColor: 'FFFFFF',
          outerColor: '111111',
          outerAlpha: 0.5,
          feedbackStrokeColor: '008FE0'
        },
        scanFeedback: {
          style: 'rect',
          strokeWidth: 2,
          strokeColor: '008FE0',
          fillColor: '22008FE0',
          beepOnResult: true,
          vibrateOnResult: true,
          blinkAnimationOnResult: true
        },
        doneButton: { // iOS only. Android uses hardware back button.
          title: 'Back',
          type: 'rect', // fullwidth, rect
          cornerRadius: 0,
          textColor: 'FFFFFF',
          textColorHighlighted: 'CCCCCC',
          fontSize: 33,
          fontName: 'HelveticaNeue',
          positionXAlignment: 'center', // left,right,center - no affect on fullwidth
          positionYAlignment: 'bottom', // top, center, bottom
          offset: {
            x: 0, // postive -> right
            y: -88, // postive -> down
          }
        },
        cancelOnResult: true
      }
    };
  constructor(private notifyService: NotifyService, private camera: Camera,
    private openALPR: OpenALPR, public modalController: ModalController,
    //  private ocr: OCR,
    private loadingCtrl: LoadingController, private platform: Platform) {
    super();
  }

  async ngOnInit() {
    // await this.loadTesseractLang();
  }

  /**
   * auto correct vin code
   *
   * @param event
   */
  validVinInput(event: any) {
    const vinCode: string = event.target.value;
    let newChar: string = vinCode.substr(-1);

    if (this.citation.vehicle_vin && this.citation.vehicle_vin.length === this.VIN_MAX_LENGTH + 1) {
      this.notifyService.showNotify(`VIN cannot exceed ${this.VIN_MAX_LENGTH} characters`, 'warning', false, 3000);
    }
    switch (newChar) {
      case 'I':
      case 'i':
        newChar = '1';
        break;

      case 'O':
      case 'o':
      case 'Q':
      case 'q':
        newChar = '0';
        break;

      default:
        break;
    }
    event.target.value = vinCode.substr(0, vinCode.length - 1) + newChar;
  }

  // Fatch text from image  
  async scanLicensePlateAndVIN() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.scanOptions = {
      country: this.openALPR.Country.US,
      amount: 3
    }

    this.camera.getPicture(options).then(async imageData => {
      try {
        const loading = await this.loadingCtrl.create();
        loading.present();
        // this.plateScaner(imageData);
        this.openALPR.scan(imageData, this.scanOptions)
          .then(async (res: [OpenALPRResult]) => {
            console.log('res => ', res);
            loading.dismiss();

            if (res.length > 0) {
              const modal = await this.modalController.create({
                component: PlatepopupModalPage,
                componentProps: {
                  "numberList": res,
                  "image": 'data:image/jpeg;base64,' + imageData
                },
                cssClass: 'platePopupModal'
              });
              modal.onDidDismiss().then((dataReturned) => {

                if (dataReturned !== null) {
                  console.log("dataReturned => ", dataReturned.data);

                  if (dataReturned.data)
                    this.citation.vehicle_license = dataReturned.data;
                }
              });

              return await modal.present();
            } else {
              this.notifyService.showNotify('Something went wrong please try again', 'warning');
            }
          }, error => {
            console.log("OpenALPRResult  error => ", error); alert("not Done")
            loading.dismiss();
          })
          .catch((error: Error) => console.error(error));
      } catch (e) {
        console.log('OCR Text error =>', e);
      }
    });
  }

  public scan() {
    try {
      cordova.exec(
        this.onSuccess,
        this.onError,
        'AnylineSDK',
        'scan',
        [this.licenseKey, this.anyLineMrzScannerConfig]);
    } catch (error) {
      console.log(error);
    }
  }

  private onSuccess(result: any) {
    console.log(result);
  }

  private onError(error: any) {
    console.log(error);
  }
}
