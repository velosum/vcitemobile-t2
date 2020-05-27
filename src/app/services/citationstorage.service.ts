import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY_CITATIONLIST = 'CitationsList';
@Injectable({
  providedIn: 'root'
})
export class CitationstorageService {

  constructor(private storage: Storage) { }

  // Set center Forms List.
  async saveCitations(data: any) {
    let newData = [];
    newData.push(data);
    this.getCitations().then(async citationList => {
      if (!citationList) {
        return await this.storage.set(STORAGE_KEY_CITATIONLIST, [data]);
      } else {
        citationList.forEach(citation => {
          newData.push(citation);
        });
      }
    });
    setTimeout(async () => {
      return await this.storage.set(STORAGE_KEY_CITATIONLIST, newData);
    }, 800);
  }
  async getCitations() {
    return await this.storage.get(STORAGE_KEY_CITATIONLIST);
  }

  async removeCitations() {
    return await this.storage.remove(STORAGE_KEY_CITATIONLIST);
  }

  async getCitationsById(id) {
    let isExist;
    return this.getCitations().then(async citationList => {
      if (!citationList) {
        return isExist = [];
      } else {
        return isExist = citationList.filter(data => data.id == id);
      }
    });
    // setTimeout(async () => {
    //    await isExist;
    // }, 500);
  }

  async updateCitations(data: any) {
    let newData = [];
    newData.push(data);
    this.getCitations().then(async citationList => {
      citationList.forEach(citation => {
        if (citation.id != data.id) {
          newData.push(citation);
        }
      });
    });
    setTimeout(async () => {
      console.log("updateCitations => ", newData);
      return await this.storage.set(STORAGE_KEY_CITATIONLIST, newData);
    }, 300);
  }
}
