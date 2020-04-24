import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatepopupModalPage } from './platepopup-modal.page';

describe('PlatepopupModalPage', () => {
  let component: PlatepopupModalPage;
  let fixture: ComponentFixture<PlatepopupModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatepopupModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatepopupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
