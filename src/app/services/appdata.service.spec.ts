import { TestBed } from '@angular/core/testing';

import { AppdataService } from './appdata.service';

describe('AppdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppdataService = TestBed.get(AppdataService);
    expect(service).toBeTruthy();
  });
});
