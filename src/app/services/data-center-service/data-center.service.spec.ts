import { TestBed } from '@angular/core/testing';

import { DataCenterService } from './data-center.service';

describe('DataCenterService', () => {
  let service: DataCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
