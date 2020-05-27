import { CitationstorageService } from './../../services/citationstorage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation } from 'src/app/entities';
import { CitationService } from 'src/app/services/citation.service';
import { DbService } from 'src/app/services/db.service';
import { StorageKeys, AppEvents } from 'src/app/utility/constant';
import { Events, LoadingController, NavController } from '@ionic/angular';
import { throwAppError } from 'src/app/shared/error-handler';
import { NotifyService } from 'ionic4-kits';
import { NetworkService } from 'src/app/services/network.service';
import { Storage } from '@ionic/storage';
const STORAGE_KEY_CITATIONLIST = 'CitationsList';


@Component({
  selector: 'app-citation',
  templateUrl: './citation.page.html',
  styleUrls: ['./citation.page.scss'],
})
export class CitationPage implements OnInit, OnDestroy {

  segment: 'vehicle' | 'violation' | 'photos' | 'review';

  citation: any;

  private get curSegment() {
    return window.localStorage.getItem(StorageKeys.CURRENT_CITATION_VIEW);
  }

  private set curSegment(segment) {
    window.localStorage.setItem(StorageKeys.CURRENT_CITATION_VIEW, segment);
  }

  constructor(
    private route: ActivatedRoute,
    private citationService: CitationService,
    private navCtrl: NavController,
    private events: Events,
    private networkService: NetworkService,
    private citationstorageService: CitationstorageService,
    private loadingCtrl: LoadingController,
    private notifyService: NotifyService,
    private storage: Storage
  ) { }

  async ngOnInit() {

    const { cId } = this.route.snapshot.params;

    this.citationService.currentId = cId;

    const loading = await this.loadingCtrl.create();
    loading.present();

    try {
      // this.citation = await this.citationService.getCitation(Number(cId));
      this.storage.get(STORAGE_KEY_CITATIONLIST).then(citationList => {
        this.citation = citationList.filter(data => data.id == cId)[0];
        console.log(" this.citation =>  ", this.citation);

        loading.dismiss();
        if (this.citation.is_submitted) {
          this.segment = this.curSegment as any || 'review';
        } else {
          this.segment = this.curSegment as any || 'vehicle';
        }
      });
    } catch (e) {
      loading.dismiss();

      console.log(e);

      // throwAppError('DB_ENTITY_READ_FAILED');
    }

    this.events.subscribe(AppEvents.EVENT_MAP_SELECTED, async () => {
      this.storage.get(STORAGE_KEY_CITATIONLIST).then(citationList => {
        this.citation = citationList.filter(data => data.id == cId)[0];
        // console.log(" this.citation =>  ", this.citation);
      });
      // this.citation = await this.citationService.getCurrentCitation();
      // alert(this.citation);
    });
  }

  async onSubmit() {

   await  this.saveCitation();

   await  this.notifyService.showConfirm(
      'All changes have been saved to your device storage. Do you want to upload now?',
      'Confirm',
      async () => {
        const loading = await this.loadingCtrl.create();
        loading.present();

        try {

          if (this.networkService.isConnected()) {
            const success = await this.citationService.submitCitation(this.citation);
            // loading.dismiss();

            // if (success) {

            //   try {
            //     this.citation.is_submitted = true;
            //     // await this.citation.save();
            //   } catch (e) {
            //     console.log(e);

            //     // throwAppError('DB_ENTITY_UPDATE_FAILED');
            //   }

            //   this.notifyService.showAlert(success.response, 'Success');

            //   this.navCtrl.navigateRoot('/citations');
            // }
          } else {
            loading.dismiss();
            this.notifyService.showNotify('Could not connect to the server. Please check your internet connection/speed.', 'warning');
          }

        } catch (e) {
          loading.dismiss();

          console.log('Submit fails!', e);

          this.notifyService.showAlert(JSON.stringify(e), 'Error');
        }
      });
  }

  segmentChanged(ev: any) {
    this.segment = ev.target.value;

    this.curSegment = this.segment;
  }

  ngOnDestroy() {
    this.events.unsubscribe(AppEvents.EVENT_MAP_SELECTED);
    this.saveCitation();
  }

  checkSegment(displaySegment) {
 
  }

  saveCitation() {
    try {
      this.citation.timestamp = String(Date.now());
      this.citation.is_visible = true;

   return this.citationstorageService.updateCitations(this.citation).then(data => {
       return  data;
      }, errror => {
      });
    } catch (e) {
      return  throwAppError('DB_ENTITY_UPDATE_FAILED');
    }
  }

}
