import { CitationstorageService } from './../../services/citationstorage.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Citation } from 'src/app/entities';
import { throwAppError } from 'src/app/shared/error-handler';

@Component({
  selector: 'tab-abstract',
  template: ''
})
export class AbstractComponent implements OnInit, OnDestroy {

  @Input()
  citation: any;

  @Input()
  citationstorageService: CitationstorageService;

  constructor() { }

  async ngOnInit() {

  }

  async ngOnDestroy() {
    // try {
    //   this.citation.timestamp = String(Date.now());
    //   this.citation.is_visible = true;

    //   // await this.citation.save();
    //   this.citationstorageService.updateCitations(this.citation).then(data => {

    //   }, errror => {
    //     console.log(" errror => ", errror);
    //   });
    // } catch (e) {
    //   throwAppError('DB_ENTITY_UPDATE_FAILED');
    // }
  }

}
