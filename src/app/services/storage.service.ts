import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY_LOCATION = 'location';
const STORAGE_KEY_PLATECOLOR = 'platecolor';
const STORAGE_KEY_PLATETYPE = 'platetype';
const STORAGE_KEY_VEHCOLOR = 'vehcolor';
const STORAGE_KEY_VEHMAKE = 'vehmake';
const STORAGE_KEY_VEHSTATE = 'vehstate';
const STORAGE_KEY_VIOLATION = 'violation';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  async saveDrownValues(data: any, value) {
    if (value == 'Location') {
      await this.storage.set(STORAGE_KEY_LOCATION, data);
    } else if (value == 'PlateColor') {
      await this.storage.set(STORAGE_KEY_PLATECOLOR, data);
    } else if (value == 'PlateType') {
      await this.storage.set(STORAGE_KEY_PLATETYPE, data);
    } else if (value == 'VehColor') {
      await this.storage.set(STORAGE_KEY_VEHCOLOR, data);
    } else if (value == 'VehMake') {
      await this.storage.set(STORAGE_KEY_VEHMAKE, data);
    } else if (value == 'VehState') {
      await this.storage.set(STORAGE_KEY_VEHSTATE, data);
    } else if (value == 'Violation') {
      await this.storage.set(STORAGE_KEY_VIOLATION, data);
    }
  }
  async getLocation() {
    return await this.storage.get(STORAGE_KEY_LOCATION);
  }
  async getPlateColor() {
    return await this.storage.get(STORAGE_KEY_PLATECOLOR);
  }
  async getPlateType() {
    return await this.storage.get(STORAGE_KEY_PLATETYPE);
  }
  async getVehColor() {
    return await this.storage.get(STORAGE_KEY_VEHCOLOR);
  }
  async getVehMake() {
    return await this.storage.get(STORAGE_KEY_VEHMAKE);
  }
  async getVehState() {
    return await this.storage.get(STORAGE_KEY_VEHSTATE);
  }
  async getViolation() {
    return await this.storage.get(STORAGE_KEY_VIOLATION);
  }
}
