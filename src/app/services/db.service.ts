import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { createConnection, ConnectionOptions, getConnection, getManager, getRepository } from 'typeorm';
import { EntityFactory, VehColor, Citation, VehState, VehMake, Location,
   Attachment, AttachmentType, PlateType, Violation } from '../entities';
import { StorageKeys, DefaultValues } from '../utility/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  synchronizeChange: Subject<number>;

  constructor(
    private platform: Platform,
    private httpClient: HttpClient,
    private loadingCtrl: LoadingController,
    private storageService: StorageService
  ) {
    this.synchronizeChange = new Subject();
  }


  get isSynchronized() {
    return !!window.localStorage.getItem(StorageKeys.DB_SYNCHRONIZED);
  }

  /**
   * Synchronization
   *
   * @param entities
   */
  async synchronize(force = false) {

    if (this.isSynchronized && !force) {
      return;
    }

    const entities: any[] = ['VehColor', 'VehMake', 'VehState', 'PlateType', 'Location', 'Violation', 'PlateColor'];
    // const entities: any[] = [VehColor, VehMake, VehState, PlateType, Location, Violation];

    const loading = await this.loadingCtrl.create({
      message: 'initializing database...'
    });

    try {
      await getManager().transaction(async tem => {
        loading.present();

        for (const entity of entities) {
          const tableName = entity.toLowerCase();
         this.httpClient.get(`assets/data/${tableName}.json`).subscribe(data => {
          this.storageService.saveDrownValues(data, entity);
          });
        }

        // await this.initializeDb();

        window.localStorage.setItem(StorageKeys.DB_SYNCHRONIZED, JSON.stringify({ updatedTime: Date.now() }));

        loading.dismiss();
      });
    } catch (e) {
      console.log(e);
      loading.dismiss();
    }
  }

  async initializeDb() {
    let defaultCitation = await getRepository(Citation).findOne(DefaultValues.CITATION_DEFAULT_ID);

    if (defaultCitation) {
      // TODO: update default citation after a new synchronzation completed.
    } else {
      defaultCitation = new Citation();
      defaultCitation.id = DefaultValues.CITATION_DEFAULT_ID;
      defaultCitation.vehicle_state = await getRepository(VehState).findOne();
      defaultCitation.vehicle_color = await getRepository(VehColor).findOne();
      defaultCitation.vehicle_make = await getRepository(VehMake).findOne();
      defaultCitation.plate_type = await getRepository(PlateType).findOne();
      // defaultCitation.plate_color = await getRepository(PlateColor).findOne();

      const location = new Location();
      location.Street = '';
      location.source = 'input';
      location.id = Date.now();

      defaultCitation.location = location;

      // await defaultCitation.save();
    }
  }

  /**
   * Create DB connection
   */
  async createConnection() {

    try {
      let dbOptions: ConnectionOptions;

      if (this.platform.is('cordova') || this.platform.is('ios')) {
        dbOptions = {
          type: 'cordova',
          database: '__vcitemobileNew',
          location: 'default',
        };
      } else {
        dbOptions = {
          type: 'sqljs',
          location: 'browser',
          autoSave: true
        };
      }
      /* else {
       dbOptions = {
         type: 'websql',
         database: '__vcitemobile',
         version: '1',
         description: '',
         size: 2 * 1024 * 1024
       };
     }*/
      // additional options
      Object.assign(dbOptions, {
        logging: false,
        synchronize: true,
        entities: EntityFactory.getAllEntities()
      });

      await createConnection(dbOptions);

    } catch (e) {

      console.log('Create connection failed.', e);

    }

  }
}
