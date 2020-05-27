import { TestBed } from '@angular/core/testing';

import { CitationstorageService } from './citationstorage.service';

describe('CitationstorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitationstorageService = TestBed.get(CitationstorageService);
    expect(service).toBeTruthy();
  });
});
