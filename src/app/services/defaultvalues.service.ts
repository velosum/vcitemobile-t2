import { StorageService } from './storage.service';
import { DefaultValues } from 'src/app/utility/constant';
import { CitationViewMidel } from '../model/citationViewModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultvaluesService {

  constructor(private storageService: StorageService) { }

  async getDefaultValues() {
    let data = new CitationViewMidel();
    data.attachments = [];
    data.comments = '';
    data.custKey = '';
    data.docKey = '';
    data.expiration_date = '';
    data.id = DefaultValues.CITATION_DEFAULT_ID;
    data.is_submitted = false;
    data.is_valid = false;
    data.is_visible = true;
    data.issue_date = '';
    data.issue_time = '';
    data.location = {
      ParcelID: '',
      Street: '',
      StreetNumber: '',
      Unit: '',
      address: '',
      id: 1589534990225,
      latitude: '',
      longitude: '',
      source: 'input'
    };
    data.meter_no = '';
    data.officer_id = '';
    this.storageService.getPlateColor().then(pcolor => {
      data.plate_color = pcolor[0];
    });

    this.storageService.getPlateType().then(pType => {
      data.plate_type = pType[0];
    });

    data.remarks = '';
    data.serial_number = '';
    data.timestamp = '';
    data.vehicle_body_type = '';

    this.storageService.getVehColor().then(vColor => {
      data.vehicle_color = vColor[0];
    });
    data.vehicle_license = '';
    this.storageService.getVehMake().then(vMake => {
      data.vehicle_make = vMake[0];
    });

    this.storageService.getVehState().then(vState => {
      data.vehicle_state = vState[0];
    });
    data.vehicle_vin = '';
    data.violations = [];
    data.void = false;
    data.warning = false;
     return await data;
  }
}