import { TestBed } from '@angular/core/testing';

import { DefaultvaluesService } from './defaultvalues.service';

describe('DefaultvaluesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultvaluesService = TestBed.get(DefaultvaluesService);
    expect(service).toBeTruthy();
  });
});
